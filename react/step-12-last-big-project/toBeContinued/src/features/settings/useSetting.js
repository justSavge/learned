import { getSettings as getSettingsApi } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";
export function useSetting() {
  const {
    isLoading,
    error,
    data: settingData,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });
  // console.log(data);
  return { isLoading, error, settingData };
}
