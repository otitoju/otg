interface Facility {
    name: string;
    icon: string; 
    rating: number;
  }
  
  interface LocationInformation {
    location: string;
    distance: string;
    facilities: Facility[];
  }
  
  interface IPost {
    id: number;
    user: string;
    images: string[];
    profileImage: string;
    likesCount: number;
    commentsCount: number;
    description: string;
    locationInformation: LocationInformation;
    postedTime: string;
    rating: number;
    reviews: number;
  }
  

  