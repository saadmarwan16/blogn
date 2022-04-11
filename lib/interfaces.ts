export interface IPost {
  id: string;
  imageUrl: string;
  userImageUrl: string;
  userDisplayName: string;
  content: string;
  createdAt: any;
  heartCount: number;
  saveCount: number;
  saves: string[],
  published: boolean;
  title: string;
  uid: string;
  updatedAt: any;
  username: string;
}

export interface IUserDoc {
  displayName: string;
  photoUrl: string;
  username: string;
}
