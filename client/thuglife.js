Template.World.rendered = function()
{
	var valley = new LifelikeWorld(
		["######################################################################################################################",
		 "#                                                     ~                                                              #",
		 "#                                                                                                                    #",
		 "#                                  *                                     *                  @                        #",
		 "#          *                                                                                                         #",
		 "#                    @                       ##########                                                              #",
		 "#                                                                                                 *         *        #",
		 "#                                                            *                                                       #",
		 "#                                    *                                           @                                   #",
		 "#                                                                                                                    #",
		 "#              @                                     *                ~                      *                 *     #",
		 "#                                                                  ######                                            #",
		 "#                                                                  ##**##                           *                #",
		 "#                                                                   ****#                                            #",
		 "#                           ##   ###########################       ##**##                                            #",
		 "#       *                   ##   ###########################       ######                                            #",
		 "#                           ## @ ###########################                                     ~#####~             #",
		 "#                  @        ##   *  *   *   *    *    *#####~                        *           ~# @ #~             #",
		 "#                           ## *    *    *   * *   *   #####     @                               ~#   #~             #",
		 "#                           ##   *  *   *   *    *    *#####                                     ~#####~             #",
		 "#        *                  ##      *    *   * *   *   #####         ######                                          #",
		 "#                           ##*  *  *   *   *    *    *#####~        ######              *                           #",
		 "#                           ##      *    *   * *   *   #####           ##                                            #",
		 "#          #         @      ##   *  *   *   *    *    *#####           ##                                            #",
		 "#          #                ##  #############* *   *   #####                                 *                 *     #",
		 "#          #                ##  #############    *    *##### *         ##                                            #",
		 "#   *      #                ##            ###  *    *  #####         ######                 @                        #",
		 "#          #                ############  ##################         ######                                          #",
		 "#          #                ############  ##################         ######                                          #",
		 "#          #   @                      ##  ##              ##                                                         #",
		 "#          ###########                ##  ##      @   @   ##                                                         #",
		 "#                                *    ##  ##              ##                                    ##########           #",
		 "#                                     ##  ########  ########                     *                                   #",
		 "#       *                             ##  ########  ########                                                         #",
		 "#                                     ##            ########                                                         #",
		 "#                    *                ######################            @                                            #",
		 "#                                     ######################                                @                        #",
		 "#                                                                                                              *     #",
		 "#         *             *            *                                                                               #",
		 "#                                                        *              @                                            #",
		 "#                                                                                         ~~~~                       #",
		 "######################################################################################################################",],
		{"#": Wall,
			"@": PlantEater,
			"~": WallFollower,
			"*": Plant}
	);
	animateWorld(valley);
	// → X
};
