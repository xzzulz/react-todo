
(function() {

  // individual task component
  // props
  //  checked boolean
  //  text string
  var TodoItem = React.createClass({
    getCheckboxSrc: function() {
      return this.props.item.checked ? 'img/done.png' : 'img/todo.png'
    },
    render: function() {
      return (
        <div className="item">
          <div className="itemIcon">
            <img className="todoCheck" src={this.getCheckboxSrc()} />
          </div>
          <div className="itemText"><span>{this.props.item.text}</span></div>
          <div className="itemClose">
            <img className="todoClose" src="img/delete.png"/>
          </div>
        </div>
      )
    }

  })


  // list of tasks component
  // props
  //   items
  var TodoTasks = React.createClass({
    doItems: function() {
      return this.props.items.map(function(item) {
        return <TodoItem item={item} />
      })
    },
    render: function() {
      return (
        <div id="tasksList">{this.doItems()}</div>
      )
    }

  })


  // sample initial data for the todo list
  var sampleData = [
    { checked: false, text: "abc def ghi" },
    { checked: true, text: "second task" },
    { checked: false, text: "123 456" },
    { checked: false, text: "example task" },
  ]

  // main todo component
  var Todo = React.createClass({
    getInitialState: function() {
      return { items: sampleData };
    },
    render: function() {
      return (
        <div >
          <div id="top"><h1>React Todo</h1></div>

          <div className="item">
            <input id="newItem"/>
            <img id="addIcon" src="img/add.png"/>
          </div>

          <TodoTasks items={this.state.items} />
        </div>
      )
    }

  })


  var boxNode = document.getElementById('box')
  React.render(<Todo />, boxNode);

})()
