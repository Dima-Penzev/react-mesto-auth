import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import successImg from "../images/img-success.png";
import errorImg from "../images/img-error.png";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [btnState, setBtnState] = useState(false);
  const [responseData, setResponseData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, initialCards]) => {
        setCurrentUser(user);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const token = localStorage.getItem("token");

    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/main", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(likes, cardId) {
    const isLiked = likes.some((i) => i._id === currentUser._id);

    api
      .toggleLikeState(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === cardId ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    setIsConfirmPopupOpen(true);
    setCardId(cardId);
  }

  function handleConfirmDelete(e) {
    e.preventDefault();

    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);

    api
      .setUserInfo({ username: name, activity: about })
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);

    api
      .setUserPhoto(avatar)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);

    api
      .addNewCard(newCard)
      .then((response) => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(userEmail) {
    setLoggedIn(true);
    setUserEmail(userEmail);
    toggleBtnState();
  }

  function resetStates() {
    setLoggedIn(false);
    setUserEmail("");
    toggleBtnState();
  }

  function toggleBtnState() {
    setBtnState(!btnState);
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        toggleBtnState();
        navigate("/signin", { replace: true });
        setIsInfoTooltipOpen(true);
        setResponseData({
          image: successImg,
          massege: "Вы успешно зарегистрировались!",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setResponseData({
          image: errorImg,
          massege: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          btnState={btnState}
          userEmail={userEmail}
          loggedIn={loggedIn}
          resetStates={resetStates}
          toggleBtnState={toggleBtnState}
        />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/main" replace />
              ) : (
                <Navigate to="/signup" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                toggleBtnState={toggleBtnState}
              />
            }
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/main"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatart={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleConfirmDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          name="info"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          response={responseData}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
