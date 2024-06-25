import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ editCabin, id }) => createEditCabin(editCabin, id),
    onSuccess: (data) => {
      toast.success(`成功修改客房${data.name}`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error("修改失败，请检测网址及其他可能出现的错误"),
  });
  return {editCabin,isEditing}
}
