import { useEffect, useState } from "react";
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

export const useParking = () => {
  const [parkingServers, setParkingServers] = useState<ParkingServer[]>([]);
  const [parkings, setParkings] = useState<Parking[]>([]);

  useEffect(() => {
    const channel = supabase.channel("supabase_realtime");

    getParkings(setParkings);
    getParkingServers(setParkingServers);
    const sub = channel
      .on("postgres_changes", { event: "*", schema: "public", table: "parkings" }, (payload) => {
        console.log(payload);
      })
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return { parkings, parkingServers };
};
