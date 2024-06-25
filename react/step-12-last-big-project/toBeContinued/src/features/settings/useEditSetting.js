import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as editSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: editSettingApi,
    onSuccess: () => {
      toast.success(`成功修改设置`);
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error("修改失败，请检测网址及其他可能出现的错误"),
  });
  return { editSetting, isEditing };
}
