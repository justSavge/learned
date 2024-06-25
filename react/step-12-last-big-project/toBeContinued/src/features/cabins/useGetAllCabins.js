import { useQuery } from "@tanstack/react-query";
import { getCabins as getCabinsApi } from "../../services/apiCabins";

export function useGetAllCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    //第一次获得数据，除了获得数据方法，还有定下名字queryKey
    queryKey: ["cabins"],
    queryFn: getCabinsApi,
  });
  return {
    isLoading,
    cabins,
    error,
  };
}
