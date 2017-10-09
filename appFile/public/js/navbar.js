$(document).ready(()=>{
var landing='http://localhost:3000/'
var login='http://localhost:3000/login.html'
var signup='http://localhost:3000/signup.html'
var userPage='http://localhost:3000/user.html'

var nav=$('#nav');

var outerDiv=document.createElement('div');
outerDiv.setAttribute('class', 'nav-wrapper');
var outerLink=document.createElement('a');
outerLink.setAttribute('class', 'brand-logo');
//outerLink.innerHTML='Event Tender';
var list=document.createElement('ul');
list.setAttribute('class', 'right hide-on-med-and-down');
var listItem1=document.createElement('li');
var listItem2=document.createElement('li');
var listItem3=document.createElement('li');
var listItemLink1=document.createElement('a');
listItemLink1.setAttribute('class', 'waves-effect waves-light btn')
listItemLink1.innerHTML='Signup'
var listItemLink2=document.createElement('a');
listItemLink2.setAttribute('class', 'waves-effect waves-light btn')
listItemLink2.innerHTML='Login'
var listItemLink3=document.createElement('a');
listItemLink3.setAttribute('class', 'waves-effect waves-light btn')
listItemLink3.innerHTML='Logout'
listItem1.append(listItemLink1)
listItem2.append(listItemLink2)
listItem3.append(listItemLink3)
list.append(listItem1)
list.append(listItem2)
list.append(listItem3)
outerLink.append(list);
outerDiv.append(outerLink)
nav.append(outerDiv)
})
