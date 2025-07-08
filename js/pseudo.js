export function pseudoChatFetch(userId) {
    const chats = [
        {
            user_id: 2,
            username: "John Brown",
            online: true,
            messages: [
                { from: "other", content: "Hi, how are you?", timestamp: "2025-06-07T12:05:00Z" },
                { from: "me", content: "Hi, I'm okay. How about you?", timestamp: "2025-06-07T12:07:11Z" },
                { from: "other", content: "Doing well! Are we still on for the group project meeting today?", timestamp: "2025-06-07T12:08:05Z" },
                { from: "me", content: "Yes, 4 PM at the library, right?", timestamp: "2025-06-07T12:08:55Z" },
                { from: "other", content: "Exactly. See you then!", timestamp: "2025-06-07T12:09:10Z" }
            ]
        },
        {
            user_id: 5,
            username: "Professor",
            online: false,
            messages: [
                { from: "me", content: "Are you available for a call?", timestamp: "2025-06-07T11:45:00Z" },
                { from: "other", content: "Alright, let's call tomorrow then", timestamp: "2025-06-07T11:58:47Z" },
                { from: "me", content: "Sure, what time would work best for you?", timestamp: "2025-06-07T12:01:30Z" },
                { from: "other", content: "Let’s say 10 AM. I’ll send you a Zoom link", timestamp: "2025-06-07T12:03:12Z" },
                { from: "me", content: "Perfect, thank you!", timestamp: "2025-06-07T12:04:00Z" }
            ]
        },
        {
            user_id: 7,
            username: "Jack Thompson",
            online: true,
            messages: [
                { from: "other", content: "It wasn't working earlier 😕", timestamp: "2025-06-03T13:20:00Z" },
                { from: "me", content: "Try this fix I just sent", timestamp: "2025-06-03T13:30:00Z" },
                { from: "other", content: "Thanks for the help, it's working now 🙌🙌🙌", timestamp: "2025-06-03T13:35:02Z" },
                { from: "me", content: "Glad to hear it. Let me know if anything breaks again", timestamp: "2025-06-03T13:36:22Z" },
                { from: "other", content: "Will do. Appreciate the quick support!", timestamp: "2025-06-03T13:37:45Z" }
            ]
        },
        {
            user_id: 9,
            username: "Steve",
            online: false,
            messages: [
                { from: "me", content: "Hey Steve, did you check the PR?", timestamp: "2025-06-01T11:45:00Z" },
                { from: "other", content: "Please review the pull request", timestamp: "2025-06-01T12:15:10Z" },
                { from: "me", content: "Sure, I’ll go through it now and leave comments", timestamp: "2025-06-01T12:20:35Z" },
                { from: "other", content: "Thanks. Hoping to merge it today", timestamp: "2025-06-01T12:25:00Z" }
            ]
        },
        {
            user_id: 12,
            username: "Grace Mitchell",
            online: true,
            messages: [
                { from: "other", content: "Just finished mixing the track 🔊", timestamp: "2025-05-23T11:30:00Z" },
                { from: "other", content: "Here's the new track, what do you think?", timestamp: "2025-05-23T11:47:33Z" },
                { from: "me", content: "Wow! The vocals are super clear. I like the reverb on the chorus", timestamp: "2025-05-23T11:52:10Z" },
                { from: "other", content: "Awesome! I’ll make a few tweaks and send the final version tonight", timestamp: "2025-05-23T11:55:00Z" }
            ]
        }
    ];

    return chats.find(chat => chat.user_id === userId);
}

export function pseudoAllContactsFetch() {
    return [
        {
            user_id: 2,
            username: "John Brown",
            online: true,
            last_message: {
                content: "Exactly. See you then!",
                timestamp: "2025-06-07T12:09:10Z"
            }
        },
        {
            user_id: 5,
            username: "Professor",
            online: false,
            last_message: {
                content: "Perfect, thank you!",
                timestamp: "2025-06-07T12:04:00Z"
            }
        },
        {
            user_id: 7,
            username: "Jack Thompson",
            online: true,
            last_message: {
                content: "Will do. Appreciate the quick support!",
                timestamp: "2025-06-03T13:37:45Z"
            }
        },
        {
            user_id: 9,
            username: "Steve",
            online: false,
            last_message: {
                content: "Thanks. Hoping to merge it today.",
                timestamp: "2025-06-01T12:25:00Z"
            }
        },
        {
            user_id: 12,
            username: "Grace Mitchell",
            online: true,
            last_message: {
                content: "Awesome! I’ll make a few tweaks and send the final version tonight.",
                timestamp: "2025-05-23T11:55:00Z"
            }
        }
    ];
}

export function pseudoNewContactsFetch() {
    return [
        {
            user_id: 57,
            username: "Olivia Green"
        },
        {
            user_id: 61,
            username: "Daniel"
        }
    ];
}