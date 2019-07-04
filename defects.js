var from = null;
var to = null;

if(field('От') === 'ТП'){
  from = 'от ТП ' + field('от ТП')[0].field('Адрес');
} else if(field('От') === 'ТК'){
  from = 'от ТК ' + field('от ТК')[0].field('#ТК');
} 

if(field('До') === 'ТП'){
  to = 'до ТП ' + field('до ТП')[0].field('Адрес');
} else if(field('До') === 'ТК'){
  to = 'до ТК ' + field('до ТК')[0].field('#ТК');
} else if(field('До') === 'ж/д'){
  to = 'до ж/д ' + field('до ж/д')[0].field('до ж/д');
}

from + " " + to
