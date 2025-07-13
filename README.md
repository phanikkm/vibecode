# vibecode

Sample project with a login form.

## GPU Dashboard Demo

`gpu-dashboard.html` provides a simple GPU Utilization monitoring view. The page expects an API endpoint `/api/gpus` that returns JSON like:

```json
{
  "timestamps": ["10:00", "10:05", "10:10"],
  "utilization": [50, 60, 70],
  "gpus": [
    {"name": "RTX 3090", "utilization": 70, "memory_used": 8000, "memory_total": 24576, "temperature": 60}
  ]
}
```

Integrate this page with your backend to visualize GPU data in real time.
