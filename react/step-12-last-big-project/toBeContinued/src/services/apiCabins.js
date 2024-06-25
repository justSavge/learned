import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabin 的访问出错了 ");
  }
  return data;
}
export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("cabins删除失败，请检查错误");
}
export async function createEditCabin(newCabin, id) {
  const isOldImage = typeof newCabin.image === "string";
  const imageName = `${Math.random()}-${newCabin.image?.name}`
    .replaceAll("/", "")
    .replaceAll(".", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins"); //在外面定义
  if (id) {
    isOldImage
      ? (query = query.update([newCabin]).eq("id", id))
      : (query = query.update({ ...newCabin, image: imagePath }).eq("id", id));
  } else {
    isOldImage
      ? (query = query.insert([newCabin]))
      : (query = query.insert([{ ...newCabin, image: imagePath }]));
  }
  const { data, error } = await query.select().single(); //在外面取值
  if (error) {
    console.error(error);
    throw new Error("new cabin create fail,新的客房创建失败");
  }
  console.log("返回的数据" + data);

  if (isOldImage) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    //图片错了，直接删除
    console.log("图片上传失败");
    await supabase.from("cabins").delete().eq("id", data.id);
  }
  return data;
}
