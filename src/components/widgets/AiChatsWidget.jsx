import React, { useEffect, useRef, useState } from "react";
import AiChatWidget from "./AiChatWidget";
import { useDispatch, useSelector } from "react-redux";
import EmptyTamkeen from "./EmptyTamkeen";
import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Mic, Send } from "@mui/icons-material";
import { apiRequest, fetchAiChats } from "utils";

const AiChatsWidget = () => {
  const { user, token } = useSelector((state) => state.user);
  const { aiChats } = useSelector((state) => state.aiChats);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  // reponsive
  const isSmallMobileScreens = useMediaQuery("(mi-width:450px)");
  //
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrool = useRef(null);
  //
  const scrollToBottom = (ref) => {
    ref.current.style.scrollBehavior = "smooth";
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  // get getAiChats
  const getAiChats = async () => {
    await fetchAiChats(token, dispatch);
    setLoading(false);
  };
  // useEffect
  useEffect(() => {
    setLoading(true);
    getAiChats();
    scrool && scrollToBottom(scrool);
  }, []);
  //Scrool to the las message
  useEffect(() => {
    //scrool.current?.scrollIntoView({ behavior: "smooth" });
    //scrool.current?.lastElementChild?.scrollIntoView();
    scrool && scrollToBottom(scrool);
  }, [aiChats]);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/aiChats/new",
        token: token,
        data: { message: message },
        method: "POST",
      });
      if (res?.sucess) {
        getAiChats();
        setMessage("");
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        ref={scrool}
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          overflowY: "auto",
          overflowX: "hidden",
          scrollBehavior: "smooth",
          //   mx: "auto",
          height: !isSmallMobileScreens ? "70vh" : "60vh",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              mt: "2rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : aiChats?.length > 0 ? (
          aiChats.map((chatElm) => (
            <AiChatWidget aiChat={chatElm} user={user} />
          ))
        ) : (
          <EmptyTamkeen />
        )}
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            padding: "0 0.2rem",
            borderRadius: "0.5rem",
            borderStyle: "solid",
            borderWidth: "0.1rem",
            borderColor: palette.primary.baseBlue,
          }}
        >
          <InputBase
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message) onSubmit();
            }}
            sx={{
              fontSize: "1rem",
              padding: "0 0.3rem",
              flexGrow: 1,
              color: palette.primary.baseBlue,
              backgroundColor: "inherit",
            }}
            placeholder="Write your question here ?"
          />
          <LoadingButton
            disabled={!message}
            onClick={onSubmit}
            loading={isSubmitting}
            loadingPosition="center"
            loadingIndicator={<CircularProgress color="info" size={24} />}
            sx={{
              minHeight: 0,
              minWidth: 0,
              padding: 0,
              "&:hover": {
                background: "none",
              },
            }}
          >
            <Send
              sx={{
                color: message ? palette.primary.baseBlue : "secondary",
              }}
            />
          </LoadingButton>
        </Box>
        <Tooltip title="Soon">
          <IconButton
            sx={{
              backgroundColor: palette.primary.baseBlue,
              ":hover": { backgroundColor: palette.primary.baseBlue },
              margin: "0 0.1rem",
            }}
          >
            <Mic sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default AiChatsWidget;
