import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";

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
  const [loading, setLoading] = useState(true);
  const inited = useRef(false);
  const initParkings = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      getParkings((parking) => {
        setParkings(parking);
        onInitParkings(parking);
      }),
      getParkingServers(setParkingServers),
    ]);
    setLoading(false);
  }, [onInitParkings]);

  useEffect(() => {
    window.addEventListener("online", initParkings);

    return () => {
      window.removeEventListener("online", initParkings);
    };
  }, [initParkings]);

  useEffect(() => {
    document.addEventListener("visibilitychange", initParkings);

    return () => {
      document.removeEventListener("visibilitychange", initParkings);
    };
  }, [initParkings]);

  useEffect(() => {
    const channel = supabase.channel("supabase_realtime");

    if (!inited.current) {
      initParkings();
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
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [parkingServers, onInitParkings, initParkings, onUpdateParking]);

  return { parkings, parkingServers, loading };
};
