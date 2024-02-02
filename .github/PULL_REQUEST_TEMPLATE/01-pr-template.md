---
name: PR template
about: Generic use template for PR
title: 
labels: 
assignees: ''

---

# Description of the increment

< Brief description of what has been done>

## Modules affected
- Module1
- Module2
- ...

## Preparation < IF REQUIRED >

< Explain which software or requirements we need, before proceeding to the instalation. >

- Step 1
- Step 2
    -  Aditional steps
        - More aditional Steps  
- Step 3
- ...


## Installation < IF REQUIRED >

< Every command to execute has to be printed in a textbox like the one down >

```bash
apt install example
```

< If it requires an explanation, under each textbox, a **description** shall be made >

## Usage < IF REQUIRED >
< A brief description of how to retrieve information or to use any new inmplementation for each Feature >
### Feature 1
```bash
example code to execute
```
### Feature 2
```bash
example 2 code to execute
```
### API calls
< Any new API calls >

| METHOD | Resource |  Input  | Response |
|--------|----------|---------|----------|
| POST   |          |         |          |
| PUT    |          |         |          |
| DELETE |          |         |          |
| GET    |          |         |          |
### API Objects
< Their template objects >
#### Object 1
| Field | Type |  Description |
|--------|----------|---------|

```json
{
    "valor": "valor",
    "valor2": 5
}
```