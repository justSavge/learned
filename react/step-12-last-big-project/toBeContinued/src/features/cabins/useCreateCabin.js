import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate:createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: (data) => {
      toast.success(`成功添加客房${data.name}`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error("创建失败，请检测网址及其他可能出现的错误"),
  });
  return {createCabin,isCreating}
}
