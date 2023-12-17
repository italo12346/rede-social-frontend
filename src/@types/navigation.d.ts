declare module "@react-navigation/native"
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      login: undefined;
      home: undefined;
      registro: undefined;
      profile: undefined;
      editprofile: undefined;
      createpublish: { photo: CameraCapturedPicture | undefined };
      OtherProfile: { userId: string }; 
    }
  }
}
