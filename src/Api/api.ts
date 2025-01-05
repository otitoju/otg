import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  API_KEY, 
  BASE_URL
} from '../constants/utils';

// const BASE_URL = 'http://192.168.119.48:5000/api/v1/'

/**
 * Registers a new user account using the provided payload.
 * @param {Object} payload - The user registration data.
 * @returns {Promise<Object>} - The API response containing the created account details.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function CreateAccount(payload: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'register';
  
      const info = await axios.post(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Authenticates a user with their login credentials.
   * @param {Object} payload - The login credentials.
   * @returns {Promise<Object>} - The API response containing the user token or details.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function LoginAccount(payload: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'login';
  
      const info = await axios.post(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Retrieves a list of all registered users.
   * @returns {Promise<Array>} - An array of user data.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetUsers() {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'users';
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
 
  /**
   * @param {Object} payload - The login credentials.
   * @returns {Promise<Object>} - The API response containing the user token or details.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetUserBusiness(payload: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'business/' + payload + '/user';
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Retrieves details for a specific user by their ID.
   * @param {any} id - The ID of the user to retrieve.
   * @returns {Promise<Object>} - The user's details.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetUserById(id: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'user/' + id;
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Deletes a user account by their ID.
   * @param {any} id - The ID of the user to delete.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function DeleteUserAccount(id: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'delete/user/' + id;
  
      const info = await axios.delete(url, {  
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Updates the details of a specific user.
   * @param {any} id - The ID of the user to update.
   * @param {Object} payload - The updated user data.
   * @returns {Promise<Object>} - The API response containing the updated user details.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function UpdateUser(id: any, payload: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'update/user/' + id;
  
      const info = await axios.put(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Adds a follower to a user's follower list.
   * @param {any} userId - The ID of the user to be followed.
   * @param {any} followerId - The ID of the user who is following.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function AddFollower(userId: any, followerId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + userId + '/follow/' + followerId;
  
      const info = await axios.post(url, {}, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }

  /**
 * Removes a follower from a user's follower list.
 * @param {any} userId - The ID of the user being unfollowed.
 * @param {any} followerId - The ID of the user who is unfollowing.
 * @returns {Promise<Object>} - The API response indicating success or failure.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function RemoveFollower(userId: any, followerId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + userId + '/unfollow/' + followerId;
  
      const info = await axios.delete(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Retrieves notifications for a specific user.
   * @param {any} userId - The ID of the user whose notifications are being fetched.
   * @returns {Promise<Array>} - An array of notifications.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetNotifications(userId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'notifications/' + userId;
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Marks a specific notification as read.
   * @param {any} notificationId - The ID of the notification to mark as read.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function MarkNotificationAsRead(notificationId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'notifications/' + notificationId + '/read';
  
      const info = await axios.patch(url, {}, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Retrieves a user along with their followers.
   * @param {any} userId - The ID of the user whose followers are being fetched.
   * @returns {Promise<Object>} - The user's details including follower information.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetUserWithFollowers(userId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + userId + '/followers';
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Adds interests to a specific user profile.
   * @param {any} userId - The ID of the user.
   * @param {Object} payload - The interests data to be added.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function AddInterests(userId: any, payload: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + userId + '/interests';
  
      const info = await axios.post(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Updates a specific interest for a user.
   * @param {any} userId - The ID of the user.
   * @param {any} index - The index of the interest to update.
   * @param {Object} payload - The updated interest data.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function UpdateInterest(userId: any, index: any, payload: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + userId + '/interests/' + index;
  
      const info = await axios.put(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Deletes a specific interest from a user's profile.
   * @param {any} userId - The ID of the user.
   * @param {any} index - The index of the interest to delete.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function DeleteInterest(userId: any, index: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + userId + '/interests/' + index;
  
      const info = await axios.delete(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Retrieves a specific post by its ID.
   * @param {any} id - The ID of the post to fetch.
   * @returns {Promise<Object>} - The post data.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetPostById(id: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'user/post/' + id;
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Retrieves all posts associated with the user.
   * @returns {Promise<Array>} - An array of posts.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetPosts() {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'posts/user';
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Retrieves all posts associated with the user.
   * @returns {Promise<Array>} - An array of posts.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetBusinessPosts() {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'bussiness/posts';
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  

/**
 * Creates a new post for the user.
 * @param {Object} payload - The post data to be created.
 * @returns {Promise<Object>} - The API response containing the created post details.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function CreatePost(payload: any) {
    try {
      const HEADERS = {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'user/post';
  
      const info = await axios.post(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }

/**
 * @param {Object} payload - The post data to be created.
 * @returns {Promise<Object>} - The API response containing the created post details.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function CreateNewBusinessPost(payload: any) {
    try {
      const HEADERS = {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'bussiness/post';
  
      const info = await axios.post(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }


/**
 * Creates a new business.
 * @param {Object} payload - The business data to be created.
 * @returns {Promise<Object>} - The API response containing the created post details.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function CreateBussiness(payload: any) {
    try {
      const HEADERS = {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': API_KEY,
      };
      let url = BASE_URL + 'register-business';
  
      const info = await axios.post(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Updates a specific post by its ID.
   * @param {any} postId - The ID of the post to update.
   * @param {Object} payload - The updated post data.
   * @returns {Promise<Object>} - The API response containing the updated post details.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function UpdatePost(postId: any, payload: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'update/post/' + postId;
  
      const info = await axios.put(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Deletes a specific post by its ID.
   * @param {any} postId - The ID of the post to delete.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function DeletePost(postId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'delete/post/' + postId;
  
      const info = await axios.delete(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Toggles the like status for a post by a user.
   * @param {any} userId - The ID of the user liking or unliking the post.
   * @param {any} postId - The ID of the post to like or unlike.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function ToggleLike(userId: any, postId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + userId + '/likes/' + postId;
  
      const info = await axios.post(url, {}, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Rates a specific post.
   * @param {any} postId - The ID of the post to rate.
   * @param {Object} payload - The rating data (e.g., stars, comment).
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function RatePost(postId: any, payload: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + postId + '/rating';
  
      const info = await axios.post(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Bookmarks a post for a specific user.
   * @param {any} userId - The ID of the user bookmarking the post.
   * @param {any} postId - The ID of the post to bookmark.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function BookmarkPost(userId: any, postId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + userId + '/bookmark/' + postId;
  
      const info = await axios.post(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Retrieves all bookmarked posts for a specific user.
   * @param {any} userId - The ID of the user whose bookmarks are being fetched.
   * @returns {Promise<Array>} - An array of bookmarked posts.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetBookmarkedPosts(userId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'users/' + userId + '/bookmarks';
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Creates a comment on a specific post.
   * @param {any} postId - The ID of the post to comment on.
   * @param {Object} payload - The comment data.
   * @returns {Promise<Object>} - The API response containing the created comment details.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function CreateComment(postId: any, payload: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'posts/' + postId + '/comments';
  
      const info = await axios.post(url, payload, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Retrieves comments for a specific post.
   * @param {any} postId - The ID of the post whose comments are being fetched.
   * @returns {Promise<Array>} - An array of comments.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function GetComments(postId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'posts/' + postId + '/comments';
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Deletes a comment on a specific post.
   * @param {any} postId - The ID of the post.
   * @param {any} commentId - The ID of the comment to delete.
   * @param {any} userId - The ID of the user deleting the comment.
   * @returns {Promise<Object>} - The API response indicating success or failure.
   * @throws {Error} - Throws an error if the request fails.
   */
  export async function DeleteComment(postId: any, commentId: any, userId: any) {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'posts/' + postId + '/comments/' + commentId + '/' + userId;
  
      const info = await axios.delete(url, {
        headers: HEADERS,
      });
  
      return info.data;
    } catch (error) {
      throw error;
    }
  }

  export async function GetBusiness() {
    try {
      const HEADERS = {
        'X-API-KEY': API_KEY,
      };
  
      let url = BASE_URL + 'businesses';
  
      const info = await axios.get(url, {
        headers: HEADERS,
      });
   
      return info.data;
    } catch (error) {
      throw error;
    }
  }
  