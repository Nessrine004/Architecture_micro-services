package org.example.chatbot.agents;

import org.example.chatbot.tools.AITools;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import reactor.core.publisher.Flux;

@Component
public class AIAgent {
    private ChatClient chatClient;

    public AIAgent(ChatClient.Builder builder,
                   ChatMemory memory, AITools tools) {
        this.chatClient = builder
                .defaultSystem("""
                        Vous etes un assistant qui se charge de répondre aux questions de l'utilisateur en fonction du contexte fourni.
                        Si aucun contexte est fourni, répond avec JE NE SAIS PAS  
                """)
                .defaultAdvisors(
                        MessageChatMemoryAdvisor.builder(memory).build())
                .defaultTools(tools)
                .build();
    }

    public Flux<String> askAgent(String query) {
        return chatClient.prompt()
                .user(query)
                .stream().content();
    }
}
