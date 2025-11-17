#include<iostream>
using namespcae std;
class Node{
    public:
    int data;
    Node* next;
    Node(int val){
        data = val;
        next = nullptr;
    }
};
class List{
    private:
    Node* head;
    Node* tail;
    public:
    List(){
        head=tail=nullptr;
    }
    void push_front(int val){
        Node* newNode = new Node(val);
        if(head == nullptr){
            head=tail=newNode;
        }
        else{
            newNode->next=head;
            head=newNode;
        }
    }
    void push_back(int val){
        Node* newNode = new Node(val);
        if(head == nullptr){
            head=tail=newNode;
        }
        else{
            tail->next=newNode;
            tail = newNode;
        }
    }
    void printLL(){
        Node* temp = head;
        while(temp!=nullptr){
            cout<<temo->data<<" -> "<<"  ";
            temp=temp-next;
        }
        cout<<"NULL"<<endl;
    }
};
int main(){
    List ll;
    ll.push_front(3);
    ll.push_front(6)
    ll.push_front(2)
    ll.push_front(8)
    ll.push_back(1);
    ll.printLL();
}