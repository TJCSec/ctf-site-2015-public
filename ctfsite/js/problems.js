jQuery(function($) {
    var rand = new PcgRandom()

    function sum(array) {
        var sum = 0, i
        for (i=0;i<array.length;++i) {
            if (isNaN(array[i])) {
                sum += array[i].value
            } else {
                sum += array[i]
            }
        }
        return sum
    }

    function shuffle(array) {
        var tmp, i, sloc
        for (i=array.length-1;i>0;--i) {
            sloc = rand.integer(i+1)
            tmp = array[sloc]
            array[sloc] = array[i]
            array[i] = tmp
        }
    }

    function worstAspect(length, spacing, totalArea, areas) {
        var perpsq
        length -= spacing * areas.length
        perpsq = Math.pow(totalArea/length, 2)
        return areas.reduce(function(best, area) {
            var aspect = area.value < perpsq ? perpsq / area.value : area.value / perpsq
            return Math.max(best, aspect)
        }, 1)
    }

    function createRects(rect, spacing, totalArea, used, dir, fill) {
        var inner, floc, x, y, w, h, ret, leftover, i, ind, opp, spacingUsed
        inner = rand.integer(2)
        x = rect.x
        y = rect.y
        spacingUsed = spacing * used.length
        
        if (dir === 'w') {
            opp = Math.min(rect.h-spacing, totalArea / (rect.w - spacingUsed))
            h = Math.round(opp)
            floc = rect.x
            rect.h -= h + spacing
            if (inner) {
                rect.y += h + spacing
            } else {
                y += rect.h
            }
        } else {
            opp = Math.min(rect.w-spacing, totalArea / (rect.h - spacingUsed))
            w = Math.round(opp)
            floc = rect.y
            rect.w -= w + spacing
            if (inner) {
                rect.x += w + spacing
            } else {
                x += rect.w
            }
        }
        
        var locs = used.map(function(area) {
            var ret = Math.round(floc)
            floc += area.value / opp + spacing
            return ret
        })
        
        if (dir === 'w') {
            locs.push(rect.x+rect.w)
            ret = used.map(function(area, i) {
                return makeNiceRect(locs[i], y, locs[i+1]-locs[i]-spacing, h, area.idx)
            })
        } else {
            locs.push(rect.y+rect.h)
            ret = used.map(function(area, i) {
                return makeNiceRect(x, locs[i], w, locs[i+1]-locs[i]-spacing, area.idx)
            })
        }
        
        return ret
    }

    function cut(rect, areas, spacing) {
        var dir, length, used, totalArea, aspect, prevAspect, area
        dir = rect.w < rect.h ? 'w' : 'h'
        length = rect[dir]
        used = [areas.pop()]
        totalArea = used[0].value
        prevAspect = worstAspect(length, spacing, totalArea, used)
        while (areas.length) {
            used.push(area = areas.pop())
            totalArea += area.value
            aspect = worstAspect(length, spacing, totalArea, used)
            if (aspect > prevAspect) {
                areas.push(used.pop())
                totalArea -= area.value
                break;
            }
            prevAspect = aspect;
        }
        
        return createRects(rect, spacing, totalArea, used, dir, !areas.length)
    }

    function generateRectangles(values, width, height, spacing) {
        var totalValue, totalDim, scale, rect, results, spaces
        totalValue = sum(values)
        spaces = Math.sqrt(values.length)
        totalDim = (width - spaces*spacing) * (height - spaces*spacing) - 50
        scale = totalDim / totalValue
        
        var scaled = values.map(function(x, i) {
            return {value: x * scale, idx: i}
        })
        shuffle(scaled)

        rect = {x: 0, y: 0, w: width+spacing, h: height+spacing}
        results = []
        
        while (scaled.length) {
            cut(rect, scaled, spacing).forEach(function(rect) {
                results[rect.idx] = rect
                delete rect.idx
            })
        }

        return results
    }

    function makeNiceRect(x, y, w, h, i) {
        return {x: x, y: y, w: w, h: h, idx: i}
    }

    var grid = $('#problem-grid')
    var list = $('#problem-list')
    var achievementInfo = $('#achievement-info')
    var achievementImage = achievementInfo.find('#achievement-image')
    var achievementName = achievementInfo.find('#achievement-name')
    var achievementDesc = achievementInfo.find('#achievement-description')

    var problemTemplate = Handlebars.compile($('#problem-template').html())
    var achievementTemplate = Handlebars.compile($('#achievement-template').html())
    var problemGridTemplate = Handlebars.compile($('#problem-grid-template').html())
    var problemListTemplate = Handlebars.compile($('#problem-list-template').html())

    function categoryToClass(category) {
        return category.toLowerCase().replace(' ', '-')
    }

    function loadProblems(problems) {
        var pvalues = problems.map(function(p) {
            return p.score
        })

        var rects = generateRectangles(pvalues, grid.width(), grid.height(), 3)
        rects.forEach(function(rect, i) {
            problems[i].rect = rect
        })

        tjctf.pids = tjctf.pids || {}

        problems.forEach(function(problem) {
            tjctf.pids[problem.pid] = problem
            problem.categoryClass = categoryToClass(problem.category)
        })

        list.html(problemListTemplate(problems))
        grid.html(problemGridTemplate(problems))

        var problemBoxes = $().add(list).add(grid).children('.problem')

        problemBoxes.on('click', function(e) {
            var problem = tjctf.pids[$(e.currentTarget).data('pid')]

            if (problem && !problem.disabled) {
                showProblem(problem)
            }
        })
    }

    function showProblem(problem) {
        var html = problemTemplate({problem: problem})

        var featherbox = $.featherlight(html).$instance
        featherbox.find('#problem-form').on('submit', submitFlagEvent)
        featherbox.find('input[type="text"]').focus()
    }

    function showAchievement(achievement, config) {
        var html = achievementTemplate(achievement)

        $.featherlight(html, config)
    }

    function showAchievements(achievements) {
        achievements.reverse()
        var show = achievements.reduce(function(prev, achievement) {
            return showAchievement.bind(null, achievement, {afterClose: prev})
        }, $.noop)

        show()
    }

    function showNewAchievements() {
        tjctf.apiQuery('GET', '/api/achievements')
            .done(function(data) {
                if (data.status) {
                    var achievements = data.data.filter(function(achievement) {
                        return !achievement.seen
                    })
                    setTimeout(showAchievements.bind(null, achievements), 1000)
                }
            })
    }

    function submitFlagEvent(e) {
        e.preventDefault()

        var featherbox = $.featherlight.current().$instance
        var currentPid = featherbox.find('#pid').val()

        var currentFormFields = featherbox.find('#problem-form input')
        var currentButton = featherbox.find('button')

        tjctf.apiQuery('POST', '/api/problems/submit', currentFormFields.serialize())
            .done(function(data) {
                if (data.status) {
                    $.featherlight.close()
                    tjctf.notify(data)
                    $('.problem[data-pid="' + currentPid + '"]').addClass('solved')
                } else {
                    currentButton.apiNotify(data,null,{
                        position: "bottom-right",
                    })
                }
                showNewAchievements()
            })
    }

    tjctf.apiQuery('GET', '/api/problems')
        .done(function(json) {
            tjctf.problems = json.data
            loadProblems(tjctf.problems)
        })

    showNewAchievements()
})
