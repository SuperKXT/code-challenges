# Print Binary Tree With n Leaf Nodes

[issue #271 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/everybody-gets-so-much-information-all-day-long/)

## Description

Given an integer `n`, print a balanced binary tree with `n` leaf nodes using spaces and the characters `/` and `\`.

## Example

```ts
$ printBinaryTree(2)

/\

// or you could output something like:

 /\
/  \

$ printBinaryTree(3)

 /\
/\ \

// or you could output something like:

  /\
 / /\
/ /  \

               /\
              /  \
             /    \
            /      \
           /        \
          /          \
         /            \
        /              \
       /\              /\
      /  \            /  \
     /    \          /    \
    /      \        /      \
   /\      /\      /\      /\
  /  \    /  \    /  \    /  \
 /\  /\  /\  /\  /\  /\  /\  /\
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

```
