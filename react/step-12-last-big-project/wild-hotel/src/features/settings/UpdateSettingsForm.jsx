import { useSetting } from "./useSetting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settingData: {
      maxBookingLength,
      minBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {}, //因为一开始还没有获得数据的时候结构会报错，这么些就行
  } = useSetting();
  const { isEditing, editSetting } = useEditSetting();

  if (error) throw new Error("UpdateSettingsForm获取数据失败，请检测详情:(");
  if (isLoading) return <Spinner />;
  const handleUpdate = function (e, key) {
    const { value } = e.target;
    if (!value) return;
    editSetting({ [key]: value }); //通过这样传递对象的键
  };
  return (
    <Form>
      <FormRow label="最少订阅天数">
        <Input
          type="number"
          defaultValue={minBookingLength}
          id="min-nights"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="最多订阅天数">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          id="max-nights"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="每次订阅最大客流量">
        <Input
          type="number"
          defaultValue={maxGuestsPerBooking}
          id="max-guests"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="早餐价格">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          id="breakfast-price"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
