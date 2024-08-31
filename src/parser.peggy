start
    = commandList

commandList
    = a:commandWithLineBreak* b:command lineBreak?  { return [...a, b]; }

lineBreak
    = [\n\r\f]+

s
    = [ \t]+

w
    = s?

commandWithLineBreak
    = @command lineBreak

command
    = commandBody:commandBody ";" comment:comment { return {
        "command": commandBody,
        "comment": comment
    }; }

comment
    = $[^\n\r\f]*

commandBody
    = a:singleLineWithLineBreak* b:singleLine { return a.join("") + b; }

singleLineWithLineBreak
    = w @$singleLine w lineBreak

singleLine
    = w line:$([^;\n\r\f]*) w {
        var result = line;

        if (line.length >= 1 && line[0] === '-') {
            result = ` ${result}`;
        }

        return result;
    }
