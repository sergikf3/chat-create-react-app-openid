package codes.monkey.reactivechat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import codes.monkey.reactivechat.Event.Type;

import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import static codes.monkey.reactivechat.Event.Type.USER_LEFT;

public class ChatSocketHandler implements WebSocketHandler {

    private UnicastProcessor<Event> eventPublisher;
    private Flux<String> outputEvents;
    private ObjectMapper mapper;
    private static Map<String, Long> userLoginTime = new ConcurrentHashMap();


    public ChatSocketHandler(UnicastProcessor<Event> eventPublisher, Flux<Event> events) {
        this.eventPublisher = eventPublisher;
        this.mapper = new ObjectMapper();
        this.outputEvents = Flux.from(events).map(this::toJSON);
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        WebSocketMessageSubscriber subscriber = new WebSocketMessageSubscriber(eventPublisher);
        session.receive()
                .map(WebSocketMessage::getPayloadAsText)
                .map(this::toEvent)
                .subscribe(subscriber::onNext, subscriber::onError, subscriber::onComplete);
        return session.send(outputEvents.map(session::textMessage));
    }


    private Event toEvent(String json) {
        try {
        	Event ev = mapper.readValue(json, Event.class);
        	if(ev.getType() == Type.USER_JOINED_BACKEND) {
        		String alias = ev.getUser().getAlias();
        		userLoginTime.put(alias, Long.valueOf(System.currentTimeMillis()));
        	}
        	if(ev.getType() == Type.CHAT_MESSAGE) {
        		String alias = ev.getUser().getAlias();
        		Long loginTime = userLoginTime.get(alias);
        		Long delta = loginTime == null ? 0 : loginTime;
        		ev.setDelta(delta);
        	}
            return ev;
        } catch (IOException e) {
            throw new RuntimeException("Invalid JSON:" + json, e);
        }
    }

    private String toJSON(Event event) {
        try {
            return mapper.writeValueAsString(event);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private static class WebSocketMessageSubscriber {
        private UnicastProcessor<Event> eventPublisher;
        private Optional<Event> lastReceivedEvent = Optional.empty();

        public WebSocketMessageSubscriber(UnicastProcessor<Event> eventPublisher) {
            this.eventPublisher = eventPublisher;
        }

        public void onNext(Event event) {
            lastReceivedEvent = Optional.of(event);
            eventPublisher.onNext(event);
        }

        public void onError(Throwable error) {
            //TODO log error
            error.printStackTrace();
        }

        public void onComplete() {

        	/*
            lastReceivedEvent.ifPresent(event -> eventPublisher.onNext(
                    Event.type(USER_LEFT)
                            .withPayload()
                            .user(event.getUser())
                            .build()));
                            */
        }

    }
}
