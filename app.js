//Storage Controller


//Item Controller
const ItemCtrl =(function () {
  //constructor
  const Item = function (id,name,calories) {
    this.id=id;
    this.name=name;
    this.calories=calories;
  }
  //Data Structure
  const data={
    item:[

    ],
    currentItem:null,
    totalCalories:0
  }
  return {
    logData:function () {
      return data;
    },
    addItem:function (name,calories) {
      let ID;
      let arrayLength = data.item.length;
      if (arrayLength>0) {
        ID=arrayLength;
      }
      else{
        ID=0;
      }
      calories=parseInt(calories);
      newItem = new Item(ID, name, calories);
      data.item.push(newItem);
      console.log(data.item);
      return newItem;
    },
    addCalories:function () {
      let total=0;
      (data.item).forEach(function (t) {
        total+=t.calories;
      })
      data.totalCalories=total;
      console.log(data.totalCalories);
      return data.totalCalories;
    }
  }
})();


//UI Controller
const UICtrl=(function () {
  //public methods
  return {
    populateItemList:function (items) {
      let html=''
      items.forEach(function (item) {
        html+=`<li class="collection-item" id="item-${item.id}"><b>${item.name}</b> <em>${item.calories} calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`

      })
      document.getElementById('item-list').innerHTML=html;

    },
    getItemInput:function () {
      return {
        name:document.getElementById('item-name').value,
        calories:document.getElementById('item-calories').value
      }
    },

    addListItem:function (item) {
      const li = document.createElement('li');
      li.className='collection-item';
      li.id=`item-${item.id}`;
      li.innerHTML=`<b>${item.name}</b> <em>${item.calories} calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
        document.getElementById('item-list').appendChild(li);
    },
    addCaloriesToUI:function (totalCalories) {
      document.querySelector('.total-calories').innerHTML=`${totalCalories}`;
    }
  }
})();


//Main Controller (App)
const App = (function (ItemCtrl,UICtrl) {
  //Load Event Listeners
  const loadEventListeners=function () {
    document.querySelector('.add-btn').addEventListener('click',itemAddSubmit);
  }
    const itemAddSubmit=function (e) {
    const input = UICtrl.getItemInput();
    if (input.name!=='' && input.calories!=='') {
      const newItem = ItemCtrl.addItem(input.name,input.calories);
      UICtrl.addListItem(newItem);
      const totalCalories=ItemCtrl.addCalories();
      UICtrl.addCaloriesToUI(totalCalories);
    }

    e.preventDefault();
  }
  return {
    init:function () {
      const items=ItemCtrl.logData().item;
      UICtrl.populateItemList(items);

      loadEventListeners();
    }
  }
})(ItemCtrl,UICtrl);

App.init();
