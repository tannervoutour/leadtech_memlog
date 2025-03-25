import json
import requests

# ----- CONFIGURATION -----
# Webhook URL (input to your n8n workflow)
WEBHOOK_URL = "https://tannervoutour1.app.n8n.cloud/webhook-test/ff9d72c1-2364-410a-bbd7-ee9c84a13458"

# ----- SAMPLE PAYLOAD -----
# This payload mimics the input to your n8n workflow.
sample_payload = {
    "conversation": "User: Im having trouble logging in, how do i reset my password? Assistant: Simply press reset password and that will send you an email.",
    "workspaceID": "1",
    "threadID": "2",
    "user": "sampleUser",
    "createdAt": "2025-03-19T21:30:00Z",
    "workspace": "Test Workspace",
    "summary": "",         # Initially empty; may be updated later by the workflow.
    "memoryStatus": "False",  # Or "True", based on subsequent processing.
    "previousContext": "The sky is blue",
    "preciousChunk": "The sky is blue",
}

# Print the payload for debugging
print("Sending payload:")
print(json.dumps(sample_payload, indent=2))

# ----- SEND PAYLOAD -----
# Send a POST request with the sample payload to the webhook URL.
try:
    response = requests.post(WEBHOOK_URL, json=sample_payload, headers={"Content-Type": "application/json"})
    response.raise_for_status()
    print("Status Code:", response.status_code)
    print("Response Text:", response.text)
except requests.RequestException as e:
    print("Error sending payload:", e)
