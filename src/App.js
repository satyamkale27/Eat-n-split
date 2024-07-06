import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [friend, setFriend] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handelshowAddFriend() {
    setshowAddFriend((Show) => !Show);
  }
  function handelAddFriend(newFriend) {
    setFriend((friend) => [...friend, newFriend]);
    setshowAddFriend(false);
  }
  function handelSelection(friendsss) {
    setSelectedFriend((cur) => (cur?.id === friendsss.id ? null : friendsss));
    setshowAddFriend(false);
  }
  // function handelSelection(friendsss) {
  //   showAddFriend
  //     ? setSelectedFriend(null)
  //     : setSelectedFriend((cur) =>
  //         cur?.id === friendsss.id ? null : friendsss
  //       );
  // } // my logic //

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friend}
          onSelecttion={handelSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onaddfriends={handelAddFriend} />}

        <Button onClick={handelshowAddFriend}>
          {showAddFriend ? "close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}
function FriendList({ friends, onSelecttion, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          onSelecttion={onSelecttion}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelecttion, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      <h3>{friend.name}</h3>
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelecttion(friend)}>
        {isSelected ? "close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onaddfriends }) {
  const [name, Setname] = useState();
  const [image, Setimage] = useState("https://i.pravatar.cc/48?u=499476");
  function handelsubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend); // debug //
    onaddfriends(newFriend);
    Setname("");
    Setimage("https://i.pravatar.cc/48?u=499476");
  }
  return (
    <form className="form-add-friend" onClick={handelsubmit}>
      <label> 👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => Setname(e.target.value)}
      />
      <label> 🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => Setimage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({ selectedFriend }) {
  const [bill, setBill] = useState("");
  const [paisByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>

      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />
      <label>🧍‍♀️ your expense</label>

      <input
        type="text"
        value={paisByUser}
        onChange={(e) => setPaidByUser(e.target.value)}
      />
      <label>👫 {selectedFriend.name} expense</label>

      <input type="text" disabled />
      <label>🤑 who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value={selectedFriend.value}>{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
