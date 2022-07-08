import { Timestamp } from "firebase/firestore";

export default interface Props {
  id: string | undefined;
  name: string | null | undefined;
  message: string | null | undefined;
  email: string | null | undefined;
  image: string | undefined;
  postImage: string | null | undefined;
  timestamp: Timestamp | null;
}
