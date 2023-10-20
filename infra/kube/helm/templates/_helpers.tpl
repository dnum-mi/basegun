{{/*
Expand the name of the chart.
*/}}
{{- define "basegun.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "basegun.FrontFullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}-frontend
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}-frontend
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}-frontend
{{- end }}
{{- end }}
{{- end }}

{{- define "basegun.BackFullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}-backend
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}-backend
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}-backend
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "basegun.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "basegun.BackLabels" -}}
helm.sh/chart: {{ include "basegun.chart" . }}
{{ include "basegun.BackSelectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}


{{- define "basegun.FrontLabels" -}}
helm.sh/chart: {{ include "basegun.chart" . }}
{{ include "basegun.FrontSelectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "basegun.FrontSelectorLabels" -}}
app.kubernetes.io/name: {{ include "basegun.name" . }}-frontend
app.kubernetes.io/instance: {{ .Release.Name }}
app: Basegun
tier: frontend
env: {{ .Values.env }}
{{- end }}


{{- define "basegun.BackSelectorLabels" -}}
app.kubernetes.io/name: {{ include "basegun.name" . }}-backend
app.kubernetes.io/instance: {{ .Release.Name }}
app: Basegun
tier: backend
env: {{ .Values.env }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "basegun.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "basegun.name" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
