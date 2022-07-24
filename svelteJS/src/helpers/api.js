import { collection, doc, addDoc, query, where, getDocs, orderBy, getDoc, updateDoc } from "firebase/firestore";
import { db, srorage } from "./firebase";
import dayjs from "dayjs";
import { async } from "@firebase/util";

export const fetch = async (uid = '') => {
  //collectionで取って来たいdbのnameを入れる
  //whereで条件を指定,今回は、uidが同じ物(webとdb)
  const q = query(collection(db, "diaries"), where("uid", "==", uid), orderBy('createAt', 'desc'));
  //取得されるのを待つgetDocsで上記条件のものを取得する
  const querySnapshot = await getDocs(q);
  //空の配列を用意して、そこに取ってきたデータの内容をpushする
  let diaries = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    diaries.push({
      id: doc.id,
      body: doc.data().body,
      rate: doc.data().rate,
      image: doc.data().image,
      createAt: doc.data().createAt,
    });
  });
  return diaries;
};
// Add a new document with a generated id.
export const postDiary = async (uid = '', body = '', rate = 1) => {
  const docRef = await addDoc(collection(db, "diaries"), {
    uid: uid,
    rate: rate,
    body: body,
    image: '',
    createAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  });
  console.log("Document written with ID: ", docRef.id);
  console.log(new Date());
  return docRef.id ? true : false;
}

export const getDiary = async (id = 'test') => {
  const docRef = doc(db, 'diaries', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
    return docSnap.data();
  } else {
    console.log('No such document!');
    return false;
  }
}

export const updateDiary = async (id = '', body = '', rate = 1, image = '') => {
  const diaryRef = doc(db, "diaries", id);
  if (!diaryRef) { return false; }
  // Set the "capital" field of the city 'DC'
  await updateDoc(diaryRef, {
    body: body,
    rate: rate,
    image: ""
  });
  return true;
}