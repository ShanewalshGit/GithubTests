// ELIZA Pattern Matching Rules
const rules = [
    {
        pattern: /\b(i am|i'm) (.*)/i,
        responses: [
            "Why do you say that you are $2?",
            "How long have you been $2?",
            "How do you feel about being $2?"
        ]
    },
    {
        pattern: /\b(i feel|i am feeling) (.*)/i,
        responses: [
            "Tell me more about feeling $2.",
            "Do you often feel $2?",
            "When else have you felt $2?"
        ]
    },
    {
        pattern: /\b(i want|i need) (.*)/i,
        responses: [
            "What would it mean to you if you got $2?",
            "Why do you want $2?",
            "What would you do if you got $2?"
        ]
    },
    {
        pattern: /\b(my) ([^.?!]*)/i,
        responses: [
            "Tell me more about your $2.",
            "When did your $2 first start?",
            "How does your $2 make you feel?"
        ]
    },
    {
        pattern: /(love|hate) (.*)/i,
        responses: [
            "What makes you $1 $2?",
            "How strong are your feelings of $1 towards $2?",
            "What other emotions do you feel towards $2?"
        ]
    },
    {
        pattern: /\?(.*)/i,
        responses: [
            "Why do you ask that?",
            "What answer would help you the most?",
            "What do you think?"
        ]
    }
];

// Default responses when no pattern matches
const defaultResponses = [
    "Please tell me more.",
    "Can you elaborate on that?",
    "How does that make you feel?",
    "What do you mean by that?",
    "Let's explore that further."
];

// Function to generate ELIZA's response
function generateResponse(input) {
    // Check each rule
    for (const rule of rules) {
        const match = input.match(rule.pattern);
        if (match) {
            // Get random response for this rule
            let response = rule.responses[Math.floor(Math.random() * rule.responses.length)];
            
            // Replace captured groups in response
            for (let i = 1; i < match.length; i++) {
                response = response.replace(`$${i}`, match[i]);
            }
            return response;
        }
    }
    
    // If no rules match, return random default response
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Function to add a message to the chat history
function addMessage(text, isUser) {
    const chatHistory = document.getElementById('chat-history');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'eliza-message'}`;
    messageDiv.textContent = text;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Function to handle user input
function handleUserInput(event) {
    event.preventDefault();
    const input = document.getElementById('user-input');
    const userText = input.value.trim();
    
    if (userText) {
        // Add user's message
        addMessage(userText, true);
        
        // Generate and add ELIZA's response
        setTimeout(() => {
            const response = generateResponse(userText);
            addMessage(response, false);
        }, 500); // Small delay to make it feel more natural
        
        // Clear input
        input.value = '';
    }
    
    return false;
}

// Initial greeting
window.onload = () => {
    addMessage("Hello! I'm ELIZA. What's on your mind today?", false);
};