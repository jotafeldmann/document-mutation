# Overview

Theres a document database (amongst other storage solutions) to store
high volume application data. Often, the application needs to manage an array of
objects (i.e. posts, mentions) which get stored as properties of a root JSON
document. For example, a content creator platform can be
responsible for producing social posts as part of their relationship with the
brands.

The example document is located under "tests/fixtures".

- \_id is generated upon document insertion and managed the database
  management system DBMS
- Both "posts" and "mentions" are subdocument arrays because they are made
  up of objects each having their own \_id
- Subdocument arrays can be nested as shown with the "mentions" structure
  under an individual "post".

## DBMS Supported Operations

The document database we are using supports the following operations for
subdocument arrays:

- $add: adding new subdocument to the end of an array
- $remove: removing specific subdocuments by index (zero-based)
- $update: updating specific subdocuments by index (zero-based)

## What you need to build

Individual items in subdocument arrays need to be added/removed/deleted
independently to support application users making concurrent updates.
Write a generic routine named generateUpdateStatement that accepts as input:

- original document (like the one above)
- a mutation that describes only what needs updating in the original document and outputs
- an update statement following the examples in the "tests" folders.
