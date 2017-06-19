$(document).ready(function () {
    'use strict';
    
    var board = {
            name: 'Kanban Board',
            addColumn: function (column) {
                this.$element.append(column.$element);
                initSortable();
            },
        $element: $('#board .column-container')
    };
    
     function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
      }
    
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ',
            str = '';
        for (var i = 1; i <= 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    
    function Column(name) {
        var self = this;
        
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();
        
        function createColumn() {
            var $column = $('<div>').addClass('column'),
                $columnTitle = $('<h2>').addClass('column-title').text(self.name),
                $columnCardList = $('<ul>').addClass('column-card-list'),
                $columnAddCard = $('<button>').addClass('btn-add').text('Add to card'),
                $columnDelete = $('<button>').addClass('btn-delete').text('x');
            
            $columnDelete.click(function() {
                    self.removeColumn();
            });

                $columnAddCard.click(function() {
                    self.addCard(new Card(prompt("Enter the name of the card")));
            });
            
            $column.attr('id', self.id).append($columnTitle)
                .append($columnAddCard)
                .append($columnDelete)
                .append($columnCardList);
            
            return $column;
        }
        
    }
    
    Column.prototype = {
        addCard: function(card) {
          this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
          this.$element.remove();
        }
    };
    
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card'),
                $cardDescription = $('<span>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('btn-delete').text('x');
            
            $cardDelete.click(function(){
                    self.removeCard();
            });
            
            $card.attr('id', self.id)
                .append($cardDescription)
                .append($cardDelete);
            return $card;
        }
    }
    
    Card.prototype = {
        removeCard: function() {
		  this.$element.remove();
        }
    }
    
    $('.create-column')
      .click(function(){
        var name = prompt('Enter a column name');
        var column = new Column(name);
            board.addColumn(column);
      });
    
    // CREATE COLUMN
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMN TO TABLE
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATE NEW CARDS
    var card1 = new Card('Create Portfolio');
    var card2 = new Card('Find job');
    var card3 = new Card('Learn CSS');
    var card4 = new Card('Learn HTML');
    var card5 = new Card('Learn JS');

    // ADDING CADRS TO COLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doingColumn.addCard(card5);
    doneColumn.addCard(card3);
    doneColumn.addCard(card4);
});