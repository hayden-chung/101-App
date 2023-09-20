                        {/* --------------------- TODO --------------------- */}
                        <View style={styles.todoScreenContainer}>
                            <TouchableOpacity style={styles.todoHeader} onPress={() => navigation.navigate("ToDoScreen")}>
                                <Text styles={styles.todoText}>Todo Screen</Text> 
                                <Ionicons name="open-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={styles.todoListWrapper}>
                                {isFocused && <TodoList/>}
                            </View>
                        </View>

                        {/* --------------------- TIMETABLE --------------------- */}
                        <View style={styles.timetableContainer}>
                            <TouchableOpacity style={styles.timetableHeader} onPress={() => navigation.navigate("TimetableScreen")}>
                                <Text styles={styles.timetableText}>Timetable Screen</Text> 
                                <Ionicons name="open-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <MiniTimetable/>
                        </View>