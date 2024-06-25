import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  //为了使得删除以后自动更新，需使用onSuccess,
  //通过令数据立刻过期的方法来更新数据，需要用到App.jsx当中的queryClient,好在为我们提供了一个牛的hook
  const queryClient = useQueryClient();

  //useMutation,使用突变，在这里对发送删除请求等操作
  const { isLoading: isDeleting, mutate:deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success(`成功删除客房`);
      queryClient.invalidateQueries({
        //cabins使得过期
        queryKey: ["cabins"], //所以这个名字很重要且唯一
      });
    },
    onError: (err) => toast.error("删除失败，请检测网址及其他可能出现的错误"),

  });
  return {isDeleting,deleteCabin}
}
