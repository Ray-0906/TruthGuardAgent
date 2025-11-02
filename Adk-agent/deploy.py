import os
import sys
import time
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv

# Load environment variables
load_dotenv()

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "./..")))

import vertexai
from news_info_verification_v2.agent import root_agent
from vertexai import agent_engines
from vertexai.preview import reasoning_engines

# Get deployment settings from environment variables
PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT", "agent-arch-476914")
LOCATION = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")
STAGING_BUCKET = os.environ.get("GOOGLE_CLOUD_STAGING_BUCKET", "gs://agent-bucket-0906")

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)

# Uncomment the following code to create a new agent engine
app = reasoning_engines.AdkApp(
    agent=root_agent,
    enable_tracing=True,
)

remote_app = agent_engines.create(
    agent_engine=app,
    requirements=[
        "google-cloud-aiplatform[adk,agent_engines]",
        "google-adk>=1.0.0",
        "requests>=2.31.0",
        "python-dotenv>=1.0.0",
        "typing-extensions>=4.5.0",
    ],
    extra_packages=["./news_info_verification_v2"],
    env_vars={
        "FACTCHECK_API_KEY": os.getenv("FACTCHECK_API_KEY"),
        "PERPLEXITY_API_KEY": os.getenv("PERPLEXITY_API_KEY"),
        "VT_API_KEY": os.getenv("VT_API_KEY"),
        "GOOGLE_API_KEY": os.getenv("GOOGLE_API_KEY"),
        "GNEWS_API_KEY": os.getenv("GNEWS_API_KEY"),
        }
)
print(f"Remote app created: {remote_app.resource_name}")