terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
  default     = "legal-connect-ai"
}

variable "region" {
  description = "Google Cloud Region"
  type        = string
  default     = "us-central1"
}

# Enable required APIs
resource "google_project_service" "apis" {
  for_each = toset([
    "aiplatform.googleapis.com",
    "documentai.googleapis.com",
    "translate.googleapis.com",
    "storage.googleapis.com",
    "cloudbuild.googleapis.com",
    "appengine.googleapis.com",
    "firestore.googleapis.com",
    "secretmanager.googleapis.com",
    "pubsub.googleapis.com",
    "bigquery.googleapis.com",
    "monitoring.googleapis.com",
    "cloudfunctions.googleapis.com"
  ])
  
  service = each.value
  disable_on_destroy = false
}

# Cloud Storage bucket for document uploads
resource "google_storage_bucket" "documents" {
  name     = "${var.project_id}-documents"
  location = var.region
  
  uniform_bucket_level_access = true
  
  lifecycle_rule {
    condition {
      age = 90
    }
    action {
      type = "Delete"
    }
  }
  
  versioning {
    enabled = true
  }
}

# Firestore database
resource "google_firestore_database" "database" {
  project     = var.project_id
  name        = "(default)"
  location_id = var.region
  type        = "FIRESTORE_NATIVE"
}

# Service account for the application
resource "google_service_account" "app_service_account" {
  account_id   = "legal-connect-app"
  display_name = "Legal Connect Application Service Account"
}

# IAM bindings for the service account
resource "google_project_iam_member" "app_permissions" {
  for_each = toset([
    "roles/aiplatform.user",
    "roles/documentai.apiUser",
    "roles/cloudtranslate.user",
    "roles/storage.objectAdmin",
    "roles/datastore.user"
  ])
  
  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.app_service_account.email}"
}

# Secret for API keys
resource "google_secret_manager_secret" "api_keys" {
  secret_id = "legal-connect-api-keys"
  
  replication {
    auto {}
  }
}

output "service_account_email" {
  value = google_service_account.app_service_account.email
}

# Pub/Sub topic for events
resource "google_pubsub_topic" "document_events" {
  name = "document-events"
}

# BigQuery dataset for analytics
resource "google_bigquery_dataset" "analytics" {
  dataset_id = "legal_connect_analytics"
  location   = var.region
}

# BigQuery table for document events
resource "google_bigquery_table" "document_events" {
  dataset_id = google_bigquery_dataset.analytics.dataset_id
  table_id   = "document_events"
  
  schema = jsonencode([
    {
      name = "event_type"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "document_id"
      type = "STRING"
      mode = "NULLABLE"
    },
    {
      name = "timestamp"
      type = "TIMESTAMP"
      mode = "REQUIRED"
    },
    {
      name = "processing_time"
      type = "FLOAT"
      mode = "NULLABLE"
    }
  ])
}

output "storage_bucket_name" {
  value = google_storage_bucket.documents.name
}

output "pubsub_topic" {
  value = google_pubsub_topic.document_events.name
}