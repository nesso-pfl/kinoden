import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { setErrorMap } from "zod";

export type ParkingServer = {
  id: string;
  name: string;
  self: boolean;
  created_at: string;
};

export type Parking = {
  created_at: string;
  id: string;
  number: number;
  open_at: string;
  owner: ParkingServer;
};

const getParkingServers = async (callback: (parkings: ParkingServer[]) => unknown) => {
  supabase
    .from("parking_servers")
    .select(`*`)
    .then((data) => {
      callback(data.data ?? []);
    });
};

const getParkings = async (callback: (parkings: Parking[]) => unknown) => {
  supabase
    .from("parkings")
    .select(
      `
       *,
       owner( id, name, self, created_at )
    `,
    )
    .order("number")
    .returns<Parking[]>()
    .then((data) => {
      callback(data.data ?? []);
    });
};

export const updateParkingOwner = async (id: string, owner: string) => {
  await supabase.from("parkings").update({ owner }).match({ id });
};

export const updateParkingOpenAt = async (id: string, open_at: Date) => {
  await supabase.from("parkings").update({ open_at: open_at.toISOString() }).match({ id });
};

type UseParkingParams = {
  onInitParkings: (parkings: Parking[]) => unknown;
  onUpdateParking: (newParking: Parking) => unknown;
};
export const useParking = ({ onInitParkings, onUpdateParking }: UseParkingParams) => {
  const [parkingServers, setParkingServers] = useState<ParkingServer[]>([]);
  const [parkings, setParkings] = useState<Parking[]>([]);
  const inited = useRef(false);
  const [channelState, setChannelState] = useState<`${REALTIME_SUBSCRIBE_STATES}`>("CLOSED");
  const [channelError, setChannelError] = useState<Error>();

  useEffect(() => {
    const channel = supabase.channel("supabase_realtime");

    if (!inited.current) {
      getParkings((parking) => {
        setParkings(parking);
        onInitParkings(parking);
      });
      getParkingServers(setParkingServers);
      inited.current = true;
    }
    const sub = channel
      .on<Omit<Parking, "owner"> & { owner: string }>(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "parkings" },
        (payload) => {
          setParkings((prev) => {
            const index = prev.findIndex((p) => p.id === payload.new.id);
            const newOwner = parkingServers.find((parkingServer) => parkingServer.id === payload.new.owner);
            if (!newOwner) throw new Error("Owner not found");
            return [...prev.slice(0, index), { ...payload.new, owner: newOwner }, ...prev.slice(index + 1)];
          });
          onUpdateParking({ ...payload.new, owner: parkingServers.find((server) => server.id === payload.new.owner)! });
        },
      )
      .subscribe((state, error) => {
        setChannelState(state);
        setChannelError(error);
      });

    return () => {
      sub.unsubscribe();
    };
  }, [parkingServers, onInitParkings, onUpdateParking]);

  return { parkings, parkingServers, channelState, channelError };
};
