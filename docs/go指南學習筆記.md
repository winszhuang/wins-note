# go指南學習筆記

Tags: GO

<aside>
💡 略過未看列表

- basics/16
- flowcontrol/8 (看起來比較麻煩的練習題，先跳過)
- moretypes/18 (比較麻煩的練習題**练习：切片**)
- moretypes/23 (這個可以先做)
- moretypes/26 (比較簡單，可以先做)
</aside>

### 包、變量和函數

## 基本類型

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // uint8 的别名

rune // int32 的别名
    // 表示一个 Unicode 码点

float32 float64

complex64 complex128
```

## exported-named

- 如果一个名字以大写字母开头，那么它就是已导出的。例如，`Pizza`就是个已导出名，`Pi`也同样，它导出自 `math`包

## 函數多個參數型別相同，可只定義最後一個

```go
func add(x int, y int) int {
	return x + y
}

// 可以變成以下
func add(x, y int) int {
	return x + y
}
```

## 函數可以return多個值

```go
package main

import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
```

## 命名返回值

```go
package main

import "fmt"

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func main() {
	fmt.Println(split(17))
}
```

## 變數的初始化

- 如果初始化值已存在，则可以省略类型；变量会从初始值中获得类型。

## :=取代 var

- 在函数中，简洁赋值语句 `:=`可在类型明确的地方代替 `var`声明
- `:=` 结构不能在函数外使用

```go
func main() {
	var i, j int = 1, 2
	k := 3
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java)
}
```

## 沒有設定初始值的變數，還是有預設值

- 没有明确初始值的变量声明会被赋予它们的 **零值**
- 零值是：
    - 数值类型为 `0`，
    - 布尔类型为 `false`，
    - 字符串为 `""`（空字符串）。

## 類型轉換的作法 - e.g. int變成float64

```go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
```

- 須注意，string無法直接轉換成數字，像是int("64")就會爆炸

## 常數const

- 常量不能用 `:=`语法声明。
- 常量可以是字符、字符串、布尔值或数值

### 流程控制語句

## for 一般用法

```go
func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}
```

## for (就是while)

- 因为 C 的 `while`在 Go 中叫做 `for`
    
    ```go
    func main() {
    	sum := 1
    	for sum < 1000 {
    		sum += sum
    	}
    	fmt.Println(sum)
    }
    ```
    

## for 無限循環

- 省略循环条件，该循环就不会结束

```go
package main

func main() {
	for {
	}
}
```

## if 後面可以接簡單語句

- `if`语句可以在条件表达式前执行一个简单的语句
- 该语句声明的变量作用域仅在 `if` 之内
- `if`的简短语句中声明的变量同样可以在任何对应的 `else`块中使用

```go
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		fmt.Println(v) // 正常顯示
		return v
	} else {
		fmt.Println(v) // 正常顯示
		return lim
	}
	
	fmt.Println(v) // 這邊會爆炸(不在if的範圍內)
	return lim
}
```

## Switch

- Go 只运行选定的 case，而非之后所有的 case
- switch 的 case 无需为常量
- 不需要寫break(自動幫你break)

```go
func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\n", os)
	}
}
```

## 沒有條件的Switch

- 没有条件的 switch 同 `switch true`一样。
- 这种形式能将一长串 if-then-else 写得更加清晰

```go
func main() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}
```

## defer

- defer 语句会将函数推迟到外层函数返回之后执行
- 用來在**函式最終要回傳前被執行**，類似 clean-up 的動作
- 注意多個defer的執行順序
    
    ```go
    func main() {
    	defer fmt.Println("666")
    	defer fmt.Println("777")
    	defer fmt.Println("888")
    
    	fmt.Println("hello")
    }
    
    // terminal
    hello
    888
    777
    666
    
    Program exited.
    ```
    
- 其他講解參考
    
    [](https://ithelp.ithome.com.tw/articles/10242498)
    
    [[Golang] Defer, Panic 和 Recovery | PJCHENder 未整理筆記](https://pjchender.dev/golang/defer-panic-recovery/)
    

## defer雷區

```go
func main() {
	assign2(50)
}

func assign2(a int) int {
	defer fmt.Println(a) // 任務交代下來的時候 a值是50，然後盡可能地拖延
	a = 100              // 老闆更動了a為100
	return a
}

/* result:
50
*/
```

```go
func main() {
	assign1(50)
}

func assign1(a int) int {
	a = 100              // 老闆更動了a為100
	defer fmt.Println(a) // 任務交代下來的時候 a值是100，然後盡可能地拖延
	return a
}

/* result:
100
*/
```

參考 : 

[](https://ithelp.ithome.com.tw/articles/10242498)

## defer堆疊

- 推迟的函数调用会被压入一个栈中。当外层函数返回时，被推迟的函数会按照后进先出的顺序调用

```go
func main() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}
// terminal
counting
done
9
8
7
6
5
4
3
2
1
0
```

### 指標、struct

- 与 C 不同，Go 没有指针运算

### 指針

```go
func main() {
	i, j := 42, 2701

	p := &i         // 指向 i
	fmt.Println(*p) // 通过指针读取 i 的值
	*p = 21         // 通过指针设置 i 的值
	fmt.Println(i)  // 查看 i 的值

	p = &j         // 指向 j
	*p = *p / 37   // 通过指针对 j 进行除法运算
	fmt.Println(j) // 查看 j 的值
}
// 42
// 21
// 73
```

### struct

- 有點像是定義js的物件 + ts的型別

```go
type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	fmt.Println(v) // {1 2}
	v.X = 4
	fmt.Println(v.X) // 4
}
// {1 2}
```

### struct的指標

```go
type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v // 新的變數p指向v
	p.X = 456
	
	fmt.Println((*p).X) // 456。 這樣寫太麻煩，所以GO允許隱式間接引用，如下可以達到同樣效果
	fmt.Println(p.X) // 456
	
	
	fmt.Println(v) {456 2}
}
```

### struct的初始化不帶值

```go
type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}  // 创建一个 Vertex 类型的结构体
	v2 = Vertex{X: 1}  // Y:0 被隐式地赋予
	v3 = Vertex{}      // X:0 Y:0
	p  = &Vertex{1, 2} // 创建一个 *Vertex 类型的结构体（指针）
)

func main() {
	fmt.Println(v1, p, v2, v3)
}
```

### 陣列和slice

## 陣列

- 初次定義陣列的長度後就不能再做更改

```go
import "fmt"

func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1]) // Hello World
	fmt.Println(a) // [Hello World]

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes) // [2 3 5 7 11 13]
}
```

## slice

- ~~陣列動態版，長度可以變更~~
    - slice的長度就是它所包含的元素個數
- 比陣列更常使用
- 切片通过两个下标来界定，即一个上界和一个下界，二者以冒号分隔
- 它会选择一个半开区间，包括第一个元素，但排除最后一个元素

```go
import "fmt"

func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4] // [3 5 7] slice
	fmt.Println(s)
}
```

## 📌 slice特性

- 更改切片的元素会修改其底层数组中对应的元素

```go
func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names) // [John Paul George Ringo]

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b) // [John Paul] [Paul George]

	b[0] = "XXX"
	fmt.Println(a, b) // [John XXX] [XXX George]
	fmt.Println(names) // [John XXX George Ringo]
}
```

## 創建slice的語法

- 就只是陣列不寫元素大小而已

```go
func main() {
	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(q) // [2 3 5 7 11 13]

	r := []bool{true, false, true, true, false, true}
	fmt.Println(r) // [true false true true false true]

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(s) // [{2 true} {3 false} {5 true} {7 true} {11 false} {13 true}]
}
```

## slice默認值

- 左邊沒寫預設0，右邊沒寫預設是slice的”長度”

```go
var a [10]int

和以上相同的意思
a[0:10]
a[:10]
a[0:]
a[:]
```

## 📌slice長度與容量

- 切片拥有 **长度**和 **容量**
- 容量 : 最大可以裝多少
    - 切片的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数
- 切片 `s`的长度和容量可通过表达式 `len(s)`和 `cap(s)`来获取

```go
func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s) // len=6 cap=6 [2 3 5 7 11 13]

	// 截取切片使其长度为 0
	s = s[:0]
	printSlice(s) // len=0 cap=6 []

	// 拓展其长度
	s = s[:4]
	printSlice(s) // len=4 cap=6 [2 3 5 7]

	// 舍弃前两个值
	s = s[2:]
	printSlice(s) // len=2 cap=4 [5 7]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

參考[https://ithelp.ithome.com.tw/articles/10156438](https://ithelp.ithome.com.tw/articles/10156438)

## nil slice

- 切片的零值是 `nil`

```go
func main() {
	var s []int
	fmt.Println(s, len(s), cap(s)) // [] 0 0
	if s == nil {
		fmt.Println("nil!") // nil!
	}
}
```

## make

- 除了用上下界(如primes[1:4])來創slice之外，可以用make來創建

```go
a := make([]int, 5)  // len(a)=5 指定長度5，然後容量就跟著5

// 傳入第三個參數指定容量
b := make([]int, 0, 5) // len(b)=0, cap(b)=5 
```

```go
func main() {
	a := make([]int, 5)
	printSlice("a", a) // a len=5 cap=5 [0 0 0 0 0]

	b := make([]int, 0, 5)
	printSlice("b", b) // b len=0 cap=5 []

	c := b[:2]
	printSlice("c", c) // c len=2 cap=5 [0 0]

	d := c[2:5]
	printSlice("d", d) // d len=3 cap=3 [0 0 0]
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n", s, len(x), cap(x), x)
}
```

## slice中的slice

```go
func main() {
	// 创建一个井字板（经典游戏）
	board := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	// 两个玩家轮流打上 X 和 O
	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\n", strings.Join(board[i], " "))
	}
}
// X _ X
// O _ X
// _ _ O
```

## slice內增加元素

- 就像js的array.push
- `append`的结果是一个包含原切片所有元素加上新添加元素的切片
- slice的底层数组太小，不足以容纳所有给定的值时，它就会分配一个更大的数组。返回的切片会指向这个新分配的数组

```go
func main() {
	var s []int
	printSlice(s) // len=0 cap=0 []

	// 添加一个空切片
	s = append(s, 0)
	printSlice(s) // len=1 cap=1 [0]

	// 这个切片会按需增长
	s = append(s, 1)
	printSlice(s) // len=2 cap=2 [0 1]

	// 可以一次性添加多个元素
	s = append(s, 2, 3, 4)
	printSlice(s) // len=5 cap=6 [0 1 2 3 4]

	// 多加兩個你發現容量比預期的更大
	s = append(s, 5, 6)
	printSlice(s) // len=7 cap=12 [0 1 2 3 4 5 6]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

## Range

- for迴圈使用range，跑一圈返回兩個值，第一個是index，第二個才是值

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow { // i就是index
		fmt.Printf("2**%d = %d\n", i, v)
	}
}
```

- 使用_來忽略該變數(在GO裡面如果宣告該變數沒有使用會報錯)

```go
func main() {
	pow := make([]int, 10)
	for i := range pow {
		pow[i] = 1 << uint(i) // == 2**i
	}
	for _, value := range pow {
		fmt.Printf("%d\n", value)
	}
}
```

### Map

- 映射的零值为 `nil`。`nil`映射既没有键，也不能添加键
- `make`函数会返回给定类型的映射，并将其初始化备用

```go
type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"]) // {40.68433 -74.39967}
}
```

## map的初始化創建

```go
type Vertex struct {
	Lat, Long float64
}

// 比較長的寫法
var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

// 比較短的寫法
var m = map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967},
	"Google":    {37.42202, -122.08408},
}

func main() {
	fmt.Println(m) // map[Bell Labs:{40.68433 -74.39967} Google:{37.42202 -122.08408}]
}
```

## map的插入、獲取、刪除

- 若 `key`在 `m` 中，`ok` 为 `true` ；否则，`ok`为 `false`
- 通过双赋值检测某个键是否存在：
    
    ```go
    elem, ok = m[key] // ok為true或者false
    ```
    

```go
func main() {
	m := make(map[string]int)

	m["Answer"] = 42
	fmt.Println("The value:", m["Answer"])

	m["Answer"] = 48
	fmt.Println("The value:", m["Answer"])

	delete(m, "Answer") // 刪除
	fmt.Println("The value:", m["Answer"]) // The value: 0     刪除後沒東西，預設0

	v, ok := m["Answer"]
	fmt.Println("The value:", v, "Present?", ok) // The value: 0 Present? false
}
```

### map的陷阱

```go
func main() {
	m := make(map[string]int)

	m["Answer"] = 42
	fmt.Println("The value:", m["Answer"])

	m["Answer"] = 0
	fmt.Println("The value:", m["Answer"])

	v, ok := m["Answer"]
	fmt.Println("The value:", v, "Present?", ok) // 這邊ok是true啦!!
}
```

### 函數當參數傳遞

```go
import (
	"fmt"
	"math"
)

func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func main() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))

	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))
}
```

## 閉包

```go
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	num := adder()
	fmt.Println(num(2))
	fmt.Println(num(2))
	fmt.Println(num(2))
}
```

### 仿物件導向

## 方法

- 可以說為了達到純函式的效果，但又要有物件導向可以抓到this的特性，所以方法像是一個函數，但是在函數名稱左手邊還會有一個接收者(就是那個物件實例)，可以靠該接收者參數來達到函數內部this.getXXX的效果
- 方法只是个带接收者参数的函数

```go
type Vertex struct {
	X, Y float64
}

// 這個v就是this啦
func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```

## 非struct類型聲明方法

- 你只能为在同一包内定义的类型的接收者声明方法，而不能为其它包内定义的类型（包括 `int`之类的内建类型）的接收者声明方法。
- 接收者的类型定义和方法声明必须在同一包内
- 不能为内建类型声明方法

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs()) // 1.4142135623730951
}

// ---------------------
// 其他範例
type Myint int

func (f Myint) Simple() int {
	if f < 0 {
		return -1
	}
	return 1
}

func main() {
	f := Myint(-5)
	fmt.Println(f.Simple()) // -1
}
```

## 指標接收者

- 指针接收者的方法可以修改接收者指向的值
- 由于方法经常需要修改它的接收者，指针接收者比值接收者更常用
- 如果沒有用指標接收者，則效果如下
    
    ```go
    type Vertex struct {
    	X, Y float64
    }
    
    func (v Vertex) Scale(f float64) {
    	v.X = v.X * f
    	v.Y = v.Y * f
    }
    
    func main() {
    	v := Vertex{3, 4}
    	v.Scale(10) // 你會發現這裡根本沒屁用，因為他沒有真的改到那個記憶體內的值
    	fmt.Println(v) // {3 4}
    }
    ```
    
    為了讓v裡面的X和Y真的有被變更，所以必須用”指標接收者”
    
    ```go
    type Vertex struct {
    	X, Y float64
    }
    
    // 這邊加上*，變成指標接收者
    func (v *Vertex) Scale(f float64) {
    	v.X = v.X * f
    	v.Y = v.Y * f
    }
    
    func main() {
    	v := Vertex{3, 4}
    	v.Scale(10)
    	fmt.Println(v) // {30 40}
    }
    ```
    
- 若使用值接收者，那么 `Scale`方法会对原始 `Vertex`值的副本进行操作

## 📌前面調用者不管是struct的值或者是指標，都可以調用方法

- 为方便起见，Go 会将语句 `v.Scale(5)`解释为 `(&v).Scale(5)`

```go
var v Vertex
v.Scale(5)  // OK
p := &v
p.Scale(10) // OK
```

## 📌方法與指標重定向

- 以值为接收者的方法被调用时，接收者既能为值又能为指针

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	var v Vertex
	fmt.Println(v.Abs()) // OK
	p := &v
	fmt.Println(p.Abs()) // OK
}

```

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	p := &Vertex{4, 3} // 注意!! 不會因為這邊是轉換成記憶體位置，帶入下面的.Scale，原本的p就會改變
	p.Scale(10)
	fmt.Println(*p) // {4,3}
}
```

## 最好都用指標接收者

- 方法能够修改其接收者指向的值
- 避免在每次调用方法时复制该值。若值的类型为大型结构体时，这样做会更加高效

## interface介面

```go
package main

import (
	"fmt"
	"math"
)

type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat 实现了 Abser
	a = &v // a *Vertex 实现了 Abser

	// 下面一行，v 是一个 Vertex（而不是 *Vertex）
	// 所以没有实现 Abser。
	a = v

	fmt.Println(a.Abs()) // 爆炸
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
```

## 不需要implement interface

```go
type I interface {
	M()
}

type T struct {
	S string
}

// 此方法表示类型 T 实现了接口 I，但我们无需显式声明此事。
func (t T) M() {
	fmt.Println(t.S)
}

func main() {
	var i I = T{"hello"}
	i.M()
}
```

## 介面也是值

- 接口值可以用作函数的参数或返回值
- 在内部，接口值可以看做包含值和具体类型的元组： `(value, type)`
- 接口值调用方法时会执行其底层类型的同名方法。

看不懂 [https://tour.go-zh.org/methods/11](https://tour.go-zh.org/methods/11)

```go

```