const API_URL = "http://localhost:5000/api";

// Hàm hỗ trợ lấy token từ localStorage
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// Hàm xử lý phản hồi chuẩn hóa
const handleResponse = async (res) => {
  try {
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Có lỗi xảy ra!" };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Lỗi xử lý phản hồi từ server" };
  }
};

// Hàm fetch API chung
async function fetchAPI(endpoint, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: getAuthHeaders(),
    };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${API_URL}${endpoint}`, options);
    return await handleResponse(res);
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// API Users
export async function login(data) {
  return await fetchAPI("/users/login", "POST", data);
}

export async function register(data) {
  return await fetchAPI("/users/register", "POST", data);
}

export async function getProfile() {
  return await fetchAPI("/users/me", "GET");
}

export async function updateProfile(profileData) {
  return await fetchAPI("/users/profile", "PUT", profileData);
}

// API Boards
export async function getBoards() {
  return await fetchAPI("/boards", "GET");
}

export async function getBoardDetails(boardId) {
  return await fetchAPI(`/boards/${boardId}`, "GET");
}

export async function createBoard(boardData) {
  return await fetchAPI("/boards", "POST", boardData);
}

export async function updateBoard(boardId, boardData) {
  return await fetchAPI(`/boards/${boardId}`, "PUT", boardData);
}

export async function deleteBoard(boardId) {
  return await fetchAPI(`/boards/${boardId}`, "DELETE");
}

// API Lists
export async function getListsByBoard(boardId) {
  return await fetchAPI(`/boards/${boardId}/lists`, "GET");
}

export async function createList(boardId, listData) {
  return await fetchAPI(`/boards/${boardId}/lists`, "POST", listData);
}

export async function updateList(listId, listData) {
  return await fetchAPI(`/lists/${listId}`, "PUT", listData);
}

export async function deleteList(listId) {
  return await fetchAPI(`/lists/${listId}`, "DELETE");
}

// API Cards
export async function getCardsByList(listId) {
  return await fetchAPI(`/lists/${listId}/cards`, "GET");
}

export async function createCard(listId, cardData) {
  return await fetchAPI(`/lists/${listId}/cards`, "POST", cardData);
}

export async function updateCard(cardId, cardData) {
  return await fetchAPI(`/cards/${cardId}`, "PUT", cardData);
}

export async function deleteCard(cardId) {
  return await fetchAPI(`/cards/${cardId}`, "DELETE");
}

export async function updateCardPosition(cardId, destination) {
  return await fetchAPI(`/cards/${cardId}/move`, "PUT", destination);
}
