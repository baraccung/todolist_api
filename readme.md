# TodoList API

## API Endpoints

### 🔓 List Task

Lists all tasks.

```bash
GET /api/tasks
```

#### Response
 
```bash
Status: 200 OK
```

```json
[
  {
    "id": 1,
    "task": "Buy Breakfast",
    "note": "coffe and protein to start this fckin day",
    "time": "08:00",
    "completed": false
  },
  {
    "id": 2,
    "task": "Meeting",
    "note": "Work Work Work",
    "time": "13:00",
    "completed": false
  },
  {
    "id": 3,
    "task": "Buy Groceries",
    "note": "some food and drink, don't forget the snacks",
    "time": "16:00",
    "completed": false
  }
]
```

### 🔓 Get a task

Provides information a task from todo list.

```bash
GET /api/tasks/:id
```

#### Response

##### If task is not found

```bash
Status: 404 Not Found
```

##### If task is found

```bash
Status: 200 OK
```

```json
{
  "id": 1,
  "task": "Buy Breakfast",
  "note": "some veggie might be good",
  "time": "08:00",
  "completed": false
}
```

### 🧨 Create a task

Creates a task in todo list.

```bash
POST /api/tasks
```

#### Input

| Name          | Type      | Description                                |
| ------------- | :-------  | :----------------------------------------- |
| `task`        | `string`  | **Required**. The task's name              |
| `note`        | `string`  | The task's description or notes            |
| `time`        | `number`  | **Required**. The task's time.             |
| `completed`   | `boolean` | **Required**. The task's status.           |

##### Example

```json
{
  "task": "Learn something!",
  "note": "what about blockchain?",
  "time": "20:00",
  "completed": false
}
```

#### Response

```bash
Status: 201 Created
```

```json
{
  "id": 4,
  "task": "Learn something!",
  "note": "what about blockchain?",
  "time": "20:00",
  "completed": false
}
```

### 🧨 Update a task

Update a task from todo list by overwriting the entire entity. You must send the entire resource in the request.

```bash
PUT /api/tasks/:id
```

#### Input

| Name          | Type      | Description                                |
| ------------- | :-------  | :----------------------------------------- |
| `task`        | `string`  | **Required**. The task's name              |
| `note`        | `string`  | The task's description or notes            |
| `time`        | `number`  | **Required**. The task's time.             |
| `completed`   | `boolean` | **Required**. The task's status.           |

If you only need to update some of the task properties, use the `PATCH /api/tasks/:id` endpoint.

##### Example

Take the following item as an example:

```json
{
  "task": "Learn something!",
  "note": "what about blockchain?",
  "time": "20:00",
  "completed": false
}
```

If you want to update the time only, you'll send a request body like the following:

```json
{
  "task": "Learn something!",
  "note": "what about blockchain?",
  "time": "22:00",
  "completed": false
}
```

#### Response

##### If task is not found

```bash
Status: 201 Created
```

```json
{
  "id": 5,
  "task": "Learn something!",
  "note": "what about blockchain?",
  "time": "22:00",
  "completed": false
}
```

##### If item is found

```bash
Status: 200 OK
```

```json
{
  "id": 4,
  "task": "Learn something!",
  "note": "what about blockchain?",
  "time": "22:00",
  "completed": false
}
```

### 🧨 Patch a task

Update certain properties of a task from todo list. Only requires you to send the data that you want to update.

```bash
PATCH /api/tasks/:id
```

#### Input

| Name          | Type      | Description                                |
| ------------- | :-------  | :----------------------------------------- |
| `task`        | `string`  | **Required**. The task's name              |
| `note`        | `string`  | The task's description or notes            |
| `time`        | `number`  | **Required**. The task's time.             |
| `completed`   | `boolean` | **Required**. The task's status.           |


##### Example

Take the following item as an example:

```json
{
  "id": 4,
  "task": "Learn something!",
  "note": "what about blockchain?",
  "time": "20:00",
  "completed": false
}
```

If you want to update the `completed` only, you'll send a request body like the following:

```json
{
  "completed": true
}
```

#### Response

##### If item is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 204 No Content
```

### 🧨 Remove all tasks

Remove all tasks from todo list.

```bash
DELETE /api/tasks
```

#### Response

```bash
Status: 204 No Content
```

### 🧨 Remove a task

Remove a task from todo list.

```
DELETE /api/tasks/:id
```

#### Response

##### If item is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 204 No Content
```
