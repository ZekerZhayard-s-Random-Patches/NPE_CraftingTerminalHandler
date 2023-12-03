
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var JumpInsnNode = Java.type("org.objectweb.asm.tree.JumpInsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");
var TypeInsnNode = Java.type("org.objectweb.asm.tree.TypeInsnNode");
var VarInsnNode = Java.type("org.objectweb.asm.tree.VarInsnNode");

function initializeCoreMod() {
    return {
        "de/mari_023/ae2wtlib/wct/CraftingTerminalHandler_getCraftingTerminalHandler": {
            "target": {
                "type": "METHOD",
                "class": "de/mari_023/ae2wtlib/wct/CraftingTerminalHandler",
                "methodName": "getCraftingTerminalHandler",
                "methodDesc": "(Lnet/minecraft/world/entity/player/Player;)Lde/mari_023/ae2wtlib/wct/CraftingTerminalHandler;"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.INVOKEVIRTUAL && node.owner.equals("java/util/HashMap") && node.name.equals("containsKey") && node.desc.equals("(Ljava/lang/Object;)Z")) {
                        mn.instructions.set(node.getNext(), new JumpInsnNode(Opcodes.IFNULL, node.getNext().label));
                        mn.instructions.insert(node, new VarInsnNode(Opcodes.ALOAD, 2));
                        mn.instructions.insert(node, new VarInsnNode(Opcodes.ASTORE, 2));
                        mn.instructions.set(node, new MethodInsnNode(Opcodes.INVOKEVIRTUAL, "java/util/HashMap", "get", "(Ljava/lang/Object;)Ljava/lang/Object;", false));
                    } else if (node.getOpcode() === Opcodes.INVOKEVIRTUAL && node.owner.equals("java/util/HashMap") && node.name.equals("get") && node.desc.equals("(Ljava/lang/Object;)Ljava/lang/Object;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP2));
                        mn.instructions.set(node, new VarInsnNode(Opcodes.ALOAD, 2));
                    }
                }
                return mn;
            }
        }
    }
}
