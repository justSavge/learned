import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
//提供创建/更新功能
function CreateCabinForm({ currentCabin = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const { id: cabinId, ...cabin } = currentCabin;
  const existCabin = Boolean(cabinId);
  //这里为了便于处理表单数据，引入了一个新的hook
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: existCabin ? cabin : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  const onSubmit = function (data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (existCabin) {
      console.log(image);
      return editCabin(
        {
          editCabin: { ...data, image },
          id: cabinId,
        },
        {
          onSuccess: () => {
            reset();
            //如果直接使用本组件而不提供modal,那么这个函数就不存在，这样使用好一些
            onCloseModal?.();
          },
        }
      );
    }
    return createCabin(
      { ...data, image },
      {
        onSuccess: (data) => {
          //useQuery已经想到了我们可能要在onSuccess等使用外界参数的情况，提供了第二个参数来接受
          // console.log(data);
          reset();
          onCloseModal?.();
        },
      }
    );
    // console.log(data.image);
  };
  const onError = function (err) {
    console.log(err);
  };
  //handleSubmit(useForm),将返回数据给函数（传递的参数）
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal?'modal':'regular'}>
      <FormRow label="客房名字" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
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
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="正常价格" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "细节说明折扣不能为空" })}
        />
      </FormRow>

      <FormRow label="客房的照片">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: existCabin ? false : "还没有填入文件呢",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          取消
        </Button>
        <Button disabled={isWorking}>
          {existCabin ? "确认更新" : "确认客房"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
