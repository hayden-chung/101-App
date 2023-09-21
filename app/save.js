<FlatList   
data = {taskItems}                   // Data being inputted for flatlist to access.
showsVerticalScrollIndicator={false} // Hide scroll bar.
renderItem={({item, index}) =>       // Item and index no. of task in array. 
  taskItems[index][1] === true ? (
  <TouchableOpacity                  // Task is responsive to touches
    activeOpacity={1} 
    onLongPress={() => {setEditOrDeleteModalVisible(true); setEditingIndex(index)}}
    > 
    {/* Task component displays task item. Parameters 'text' (task text) and 'taskState' (checkbox)*/}
    <Task text={item[0]} timetableGenerator={false} taskStatus={taskItems[index][1]} taskTime={taskItems[index][3]} aspect={taskItems[index][4]} index={index} taskItems={taskItems} setTaskItems={setTaskItems} completedTask={completedTask} updateWellbeingRating={updateWellbeingRating} updateTaskList={updateTaskList}/> 
  </TouchableOpacity>
  ) : null
}/>