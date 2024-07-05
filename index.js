meetingTopics = [];

defaultValues = {
  time: 5,
  title: "New Row",
  status: "Incomplete",
};

meetingTopics.push({ ...defaultValues });
populateTopic();

function startMeeting() {}

function totalMeetingTime(meetingTopics, field) {
  let sum = 0;
  for (let obj of meetingTopics) {
    sum += Number(obj[field]) || 0;
  }
  return sum;
}

function populateTotalMeetingTime() {
  document.getElementById("meeting-time").textContent = `Total Meeting Time: ${totalMeetingTime(meetingTopics,'time')}`
}

populateTotalMeetingTime()

function addNewTopic() {
  meetingTopics.push({ ...defaultValues });
  populateTopic();
}

function populateTopic() {
  clearTopics();
  meetingTopics.forEach((topic, index) => {
    document
      .getElementById("meeting-content")
      .appendChild(generateNewTopic(topic, index));
  });
}

function finishTopic() {}

function deleteTopic(index) {
  delete meetingTopics[index];
  populateTopic();
}

function clearTopics() {
  document.getElementById("meeting-content").innerHTML = "";
}

function generateNewTopic(topic, index) {
  var wrapper = document.createElement("div");
  wrapper.setAttribute("id", `topic_row_${index}`);
  wrapper.setAttribute("class", "topic-row");

  // Topic Timer
  var topicTimer = document.createElement("span");
  topicTimer.textContent = topic.time;
  topicTimer.setAttribute("id", "topic-timer");
  wrapper.appendChild(topicTimer);

  // Finish Topic Button
  var finishTopicButton = document.createElement("button");
  finishTopicButton.setAttribute("id", "done-btn");
  finishTopicButton.textContent = "Done";
  wrapper.appendChild(finishTopicButton);

  // Topic Title
  var topictitle = document.createElement("input");
  topictitle.setAttribute("value", topic.title);
  topictitle.setAttribute("type", "text");
  topictitle.setAttribute("id", "topic-title");
  topictitle.addEventListener("input",function(index) {
    topic.title = topictitle.value
  });
  wrapper.appendChild(topictitle);

  // Topic Duration
  var topicDuration = document.createElement("input");
  topicDuration.setAttribute("type", "number");
  topicDuration.setAttribute("value", topic.time);
  topicDuration.setAttribute("id", "topic-duration");
  topicDuration.addEventListener("input",function(index) {
    topic.time = Number(topicDuration.value)
    topicTimer.textContent = topic.time;
    populateTotalMeetingTime(meetingTopics,'time')
  });
  wrapper.appendChild(topicDuration);

  // Topic Duration Label
  var topicDurationLabel = document.createElement("label");
  topicDurationLabel.setAttribute("for", "topic-duration");
  topicDurationLabel.textContent = "Mins ";
  topicDurationLabel.setAttribute("id", "topic-label");
  wrapper.appendChild(topicDurationLabel);

  // Delete Topic Button
  var deleteTopicButton = document.createElement("button");
  deleteTopicButton.setAttribute("onclick", `deleteTopic(${index})`);
  deleteTopicButton.setAttribute("id", "delete-btn");
  deleteTopicButton.textContent = "Delete";
  wrapper.appendChild(deleteTopicButton);

  return wrapper;
}

function updateCurrentTime() {
  let currentTime = new Date().toLocaleTimeString();
  document.getElementById("current-time").textContent =
    "Current Time: " + currentTime;
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);
console.log(defaultValues);