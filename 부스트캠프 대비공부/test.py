class Node:

    def __init__(self, value):
        self.left = None
        self.right = None
        self.value = value


class BinaryTree:

    def __init__(self, root):
        self.root = root

    def insert(self, value):
        self.current_node = self.root
        while True:
            if self.current_node.value > value:
                if self.current_node.left != None:
                    self.current_node = self.current_node.left
                else:
                    self.current_node.left = Node(value)
                    break
            else:
                if self.current_node.right != None:
                    self.current_node = self.current_node.right
                else:
                    self.current_node.right = Node(value)
                    break

    def search(self, value):
        self.current_node = self.root
        while self.current_node:
            if self.current_node.value == value:
                return True
            elif self.current_node.value > value:
                self.current_node = self.current_node.left
            else:
                self.current_node = self.current_node.right
        return False

    def delete(self, value):
        is_search = False
        self.current_node = self.root
        self.parent_node = self.root
        while self.current_node:
            if self.current_node.value == value:
                is_search = True
                break
            elif self.current_node.value > value:
                self.parent_node = self.current_node
                self.current_node = self.current_node.left
            else:
                self.parent_node = self.current_node
                self.current_node = self.current_node.right
        if is_search == False:
            return False

        if self.current_node.left == None and self.current_node.right == None:
            if value < self.parent_node.value:
                self.parent_node.left = None
            else:
                self.parent_node.right = None

        if self.current_node.left != None and self.current_node.right == None:
            if value < self.parent_node.value:
                self.parent_node.left = self.current_node.left
            else:
                self.parent_node.right = self.current_node.left

        if self.current_node.left == None and self.current_node.right != None:
            if value > self.parent_node.value:
                self.parent_node.left = self.current_node.right
            else:
                self.parent_node.right = self.current_node.right

        if self.current_node.left != None and self.current_node.right != None:
            self.change_node = self.current_node.right
            self.change_parent_node = self.current_node.right

            while self.change_node.left != None:
                self.change_parent_node = self.change_node
                self.change_node = self.change_node.left

            if self.change_node.right != None:
                self.change_parent_node.left = self.change_node.right

            else:
                self.change_parent_node.left = None

            if value < self.parent_node.value:
                self.parent_node.left = self.change_node
                self.change_node.right = self.current_node.right
                self.change_node.left = self.current_node.left
            else:
                self.parent_node.right = self.change_node
                self.change_node.left = self.current_node.left
                self.change_node.right = self.current_node.right

        return True


arr = [5, 2, 4, 22, 10, 12, 15, 60, 44, 9]
root = Node(30)
bst = BinaryTree(root)
for i in arr:
    bst.insert(i)

print(bst.search(22))
print(bst.search(61))
print(bst.search(60))
print(bst.delete(60))
print(bst.search(60))
print(bst.delete(22))
print(bst.delete(44))
print(bst.search(22))
print(bst.search(44))
