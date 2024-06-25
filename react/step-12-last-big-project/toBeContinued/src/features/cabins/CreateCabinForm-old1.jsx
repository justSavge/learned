import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  console.log(errors);
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: (data) => {
      toast.success(`成功添加客房${data.name}`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error("创建失败，请检测网址及其他可能出现的错误"),
  });
  //这里为了便于处理表单数据，引入了一个新的hook
  const onSubmit = function (data) {
    mutate({ ...data, image: data.image[0] });
    // console.log(data.image);
  };
  const onError = function (err) {
    console.log(err);
  };
  //handleSubmit,将返回数据给函数（传递的参数）
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="客房名字" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "名字不能为空" })}
        />
        {/* 略显奇怪的用法，但会用就行了，通过这个可以react-devtool里看到Input多出一些东西,name,onChange...,第一个参数提供对象的key,第二个参数提供验证 */}
      </FormRow>

      <FormRow label="最多居住人数" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "最多居住人数不能为空",
            min: {
              value: 1,
              message: "最多居住人数最小不能少于1哟~",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="正常价格" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isCreating}
          id="regularPrice"
          {...register("regularPrice", {
            required: "正常价格不能为空",
            min: {
              value: 0,
              message: "正常价格不能为负数哟~",
            },
          })}
        />
      </FormRow>

      <FormRow label="折扣" error={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "折扣不能为空",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              `折扣为${value}不能高于正常价格的${getValues().regularPrice}哦~`,
          })}
          // 返回的字符默认为错误信息
        />
      </FormRow>

      <FormRow label="细节说明" error={errors?.description?.message}>
        <Textarea
          disabled={isCreating}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "细节说明折扣不能为空" })}
        />
      </FormRow>

      <FormRow label="客房的照片">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          取消
        </Button>
        <Button disabled={isCreating}>确认客房</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
