import globals from './PGlobals.js'
import { draw_x, draw_dashed_rect }from "./PDrawingHelpers.js"

export const output_symbol = function(ParametricWallpaper){

    return function(){

      var w = ParametricWallpaper.grid_settings.cell_width;
      var h = ParametricWallpaper.grid_settings.cell_height;

      push();
        scale(ParametricWallpaper.resolution().scale);
        translate(width/2 , height/2);
        scale(3);
        translate(-w/2 , -h/2);
        push();
          draw_dashed_rect(0,0,w,h);
          my_symbol(0, 0);
        pop();
      pop();
    }

}

export const grid_wallpaper = function(ParametricWallpaper){

  return function(){

    var w      = ParametricWallpaper.grid_settings.cell_width;
    var h      = ParametricWallpaper.grid_settings.cell_height;
    var offset = ParametricWallpaper.grid_settings.row_offset;

    push();
      scale(ParametricWallpaper.resolution().scale);
      for(var x = -w; x < width+w; x += w){
        var row = 0;
        for(var y = -h; y < height+h; y += h){
          var shift = row%2 == 0 ? 0 : offset;
          push();
            translate(x+shift, y);
            my_symbol(x/w, y/h);
            if(ParametricWallpaper.show_guide()){
              draw_dashed_rect(0,0,w,h);
            }
          pop();
          row++;
        }
      }
    pop();
  }

}

export const glide_wallpaper = function(ParametricWallpaper){

    return function(){

      var w      = ParametricWallpaper.grid_settings.cell_width;
      var h      = ParametricWallpaper.grid_settings.cell_height;
      var offset = ParametricWallpaper.grid_settings.row_offset;

      function symbol_and_guide(x, y){
        my_symbol(x/w, y/h);
        if(ParametricWallpaper.show_guide()){
          draw_dashed_rect(0,0,w,h);
        }
      }

      push();
        scale(ParametricWallpaper.resolution().scale);
        for(var x = -w*2; x < width+w*2; x += w*2){
          var row = 0;
          for(var y = -h; y < height+h; y += h){
            push();
              translate(x, y);
              symbol_and_guide(x,y);
              translate(w*2, offset);
              scale(-1, 1);
              symbol_and_guide(x+w,y);
            pop();
            row++;
          }
        }
      pop();
    }

}
