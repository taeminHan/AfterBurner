package com.taemin.afterbunner.config;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Component
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {


    // 세션 관리용 맵
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override // 웹 소켓 연결시
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        sessions.put(session.getId(), session);
        for (WebSocketSession s : sessions.values()) {
            System.out.println(s.getId());
            if(!(s.getId().equals(session.getId()))) {
                s.sendMessage(new TextMessage("Hi" + "!"));
            }
        }
    }
    @Override // 웹 소켓 연결 종료시
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        // 세션을 맵에서 제거
        System.out.println("out");
        sessions.remove(session.getId());
    }

    @Override // 메시지 전달
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        JSONObject jsonObject = new JSONObject(payload);

        // 모든 연결된 세션에 메시지 브로드캐스트
        for (WebSocketSession s : sessions.values()) {
            if (s.isOpen()) {  // 세션이 열린 상태인지 확인
                s.sendMessage(new TextMessage(jsonObject.getString("data")));
            }
        }
    }
    @Override // 웹소켓 통신 에러시
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        super.handleTransportError(session, exception);
    }
}
