const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDv5AsvRiDXJaY8MD1JdQAvU5pjjFK4Zzs");

async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `create 5 multiple choice question from below text which has timestamps along with it. I want you to create a quiz such that if a user enters a wrong answer, it displays wrong answer and along with that it shows the specific part of transcript along with timestamps of the correct answer. The transcript is as follows -:
    0.160 - 0.648: Hi everyone. 
    0.710 - 4.678: Today I wanted to talk you through a complete roadmap for the Mern stack. 
    4.726 - 13.934: Incase you want to know what it is, why it is used, where it is used, how you can start learning it, more specifically, how you can start learning it better than everyone else, let's get right into the video. 
    14.054 - 15.734: Also, please ignore this. 
    15.894 - 17.118: It is fixed very soon. 
    17.206 - 18.534: Let me start with the disclaimer. 
    18.654 - 21.758: The disclaimer is that roadmaps like these are extremely useless. 
    21.806 - 25.086: The reason for that is you know what to do, but like you don't really do that. 
    25.190 - 33.102: I would strongly suggest after this video ends, please try to go through these three videos in which I'm actually teaching the monster stack from the basics. 
    33.158 - 41.326: And we've already had three parts now, and I'll be adding more parts to this that you actually start coding, actually start building projects, actually start making assignments. 
    41.390 - 43.630: That's the only way to learn the one stack. 
    43.742 - 47.494: This video will give you a roadmap, but unless you execute on it, you won't really learn anything. 
    47.574 - 50.438: The full stack development is generally divided into two parts. 
    50.486 - 52.462: It's the front end and the backend. 
    52.598 - 53.958: Front end is what you see. 
    54.006 - 61.554: Front end is what it reaches the user inside their browser, and backend is where a lot of magic happens, but you don't really see it as an end user. 
    61.694 - 62.746: So what is fronted on chat? 
    62.770 - 63.434: Gpd.com? 
    63.474 - 64.698: It's basically all of this. 
    64.786 - 71.402: These two buttons, this input box, this button right here, all of this is what's called front end code. 
    71.538 - 80.810: And one very high level thing you need to know is this front end code, even though it's written by developers like us, it's always run or it's always executed inside a browser. 
    80.842 - 84.410: So you can effectively, you basically give this code out to the end user. 
    84.442 - 88.434: They can actually see this code because this code needs to run on the browser. 
    88.474 - 91.130: That's the only way for you to render a screen like this. 
    91.202 - 98.122: The back end code, however, back in code basically is all the functionality of the website, which is basically what happens when I click on this button. 
    98.258 - 100.946: What happens when I ask chat GPT a question? 
    101.130 - 104.906: How is it able to decode things and how is it able to give me an answer? 
    105.050 - 107.170: All of that does not run on your browser. 
    107.202 - 110.346: It runs on a device somewhere else out in the world. 
    110.370 - 112.546: It usually runs in like data centers like these. 
    112.690 - 114.562: And that's what's called back end code. 
    114.578 - 117.834: It's all of this stuff right here. 
    117.882 - 124.626: It's this API, this code that is run on some other machine, some other computer. 
    124.674 - 128.410: And the browser, all the users get access to this code. 
    128.486 - 135.386: So this is the very high level difference between front end and back end. 
    135.442 - 138.106: So to be a full stack developer, you need to know both. 
    138.142 - 143.882: It's not enough to just be very good at front end or just very good at back end. 
    144.010 - 149.170: You need to be reasonably good at front end and reasonably good at back end. 
    149.286 - 151.354: If you want to call yourself a full stack developer. 
    151.474 - 152.582: So that's about it. 
    152.598 - 153.938: That's it for today. 
    154.018 - 154.986: Thank you. 
    155.054 - 155.170: Goodbye.`;
 const max_tokens = 250;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();
